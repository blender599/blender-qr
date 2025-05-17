// update-order.cjs
require('dotenv').config(); // You might remove this if deploying to Netlify and not needed locally
// const jwt = require('jsonwebtoken'); // No longer needed
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY; // Still needed for base client init

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

// Initialize a base client with ANON key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  const token = event.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.error('update-order: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  // --- Verification using Supabase ---
  let userId;
  try {
    console.log('update-order: Verifying token with supabase.auth.getUser...');
    // Use the base Supabase client to get user info from token, which also verifies it
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError) {
        // If Supabase verification fails (e.g., invalid signature, expired)
        console.error('update-order: Supabase auth error during getUser:', userError);
        throw userError;
    }
    if (!user) {
        console.error('update-order: User not found for the provided token');
        throw new Error('User not found for the provided token');
    }

    userId = user.id; // Store user ID if needed
    console.log('update-order: Token verified successfully via Supabase for user:', userId);

  } catch (error) {
    // Handle errors from supabase.auth.getUser
    console.error('update-order: Token verification failed via Supabase!', error);
    // Determine status code based on Supabase error if possible, default to 403
    const statusCode = error.status === 401 ? 401 : (error.status || 403);
    return {
      statusCode: statusCode,
      body: JSON.stringify({
        error: 'Authentication failed',
        details: error.message,
        name: error.name || 'SupabaseAuthError'
      }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Verification ---

  // --- Check HTTP Method ---
  if (event.httpMethod !== 'POST') {
    console.warn(`update-order: Method Not Allowed - ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Check HTTP Method ---

  // --- Process Update ---
  try {
    console.log('update-order: Raw event body:', event.body);
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (parseError) {
        console.error('update-order: Failed to parse request body:', parseError);
        throw new Error('Invalid JSON body');
    }

    const { id, status } = body;
    console.log('update-order: Parsed update:', { id, status, idType: typeof id });

    if (id === undefined || status === undefined) {
        throw new Error('Missing "id" or "status" in request body');
    }

    // Map frontend status ('Tamamlandı', 'Aktif') to database status ('done', 'active')
    const mappedStatus = status === 'Tamamlandı' ? 'done' : status === 'Aktif' ? 'active' : status;
    console.log('update-order: Mapped status:', mappedStatus);

    // Validate and convert ID
    const orderId = Number(id);
    if (isNaN(orderId) || orderId <= 0) { // Add check for positive ID
      throw new Error('Invalid order ID - must be a positive number');
    }

    // --- Create a client authenticated AS THE USER for the update operation ---
    // This passes the user's token directly to Supabase for this specific client instance
    const userSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    // --- End User Client Creation ---

    console.log(`update-order: Attempting to update order ${orderId} to status "${mappedStatus}" with user-specific client...`);

    // Use the user-specific client for the update operation
    const { data, error } = await userSupabase // Use userSupabase here
      .from('orders')
      .update({ status: mappedStatus })
      .eq('id', orderId) // Ensure using the correct column name 'id'
      .select(); // Attempt to select the updated row(s)

    // Handle potential errors during the update
    if (error) {
      console.error(`update-order: Supabase update error for order ${orderId}:`, error);
      // Rethrow the error to be caught by the main catch block
      throw error;
    }

    // Check if the update actually modified any rows (select returns updated rows)
    if (!data || data.length === 0) {
      // If no rows were returned, check if the order actually exists (maybe it was deleted?)
      // Use the base client here, assuming SELECT is allowed by RLS for authenticated users
      console.warn(`update-order: Update for order ${orderId} returned no data. Checking if order exists...`);
      const { data: existingOrder, error: fetchError } = await supabase
        .from('orders')
        .select('id, status') // RLS must allow SELECT for authenticated
        .eq('id', orderId)
        .maybeSingle(); // Use maybeSingle to handle null if not found

      if (fetchError) {
          console.error(`update-order: Error checking existence for order ${orderId}:`, fetchError);
          // Throw a generic error, as the update already failed anyway
          throw new Error(`Update failed for order ${orderId} and existence check also failed.`);
      }

      if (!existingOrder) {
          console.error(`update-order: Order ${orderId} not found.`);
          // Throw a specific error indicating the order doesn't exist
          const notFoundError = new Error(`Order ${orderId} not found.`);
          notFoundError.status = 404; // Add status for better error handling
          throw notFoundError;
      } else {
          // Order exists but wasn't updated - most likely RLS blocking the update
          console.warn(`update-order: Order ${orderId} exists but update returned no data. Possible RLS block.`);
          throw new Error(`Update failed for order ${orderId}, likely due to permissions (RLS).`);
      }
    }

    // If data is returned, the update was successful
    console.log('update-order: Update successful for order:', orderId, 'New data:', data);

    // Return 200 OK with the updated data
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Order updated successfully', data }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };

  } catch (error) {
    // Catch errors from parsing, validation, or Supabase operations
    console.error('update-order: Error processing update request:', error.message, error.code ? `(Code: ${error.code})` : '');

    // Determine appropriate status code
    let statusCode = 400; // Bad Request by default
    if (error.message.includes('Invalid JSON body') || error.message.includes('Missing "id" or "status"') || error.message.includes('Invalid order ID')) {
        statusCode = 400; // Bad Request
    } else if (error.status === 404 || error.message.includes('not found')) {
        statusCode = 404; // Not Found
    } else if (error.message.includes('RLS') || error.code === '42501' /* permission denied */) {
        statusCode = 403; // Forbidden (due to RLS)
    } else if (error.code) { // Handle potential Supabase error codes if needed
        // Example: You might check for specific PostgreSQL error codes
        statusCode = 500; // Internal Server Error for unhandled DB errors
    } else {
        statusCode = 500; // Generic Internal Server Error
    }


    return {
      statusCode: statusCode,
      body: JSON.stringify({ message: 'Failed to process update request', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Process Update ---
};