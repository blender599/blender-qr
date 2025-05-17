// get-item-by-id.cjs
require('dotenv').config(); // Keep if needed locally, consider removing for Netlify deployment
// const jwt = require('jsonwebtoken'); // No longer needed
const { createClient } = require('@supabase/supabase-js');

// Config
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY; // Needed for base client init

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

// Initialize base client with ANON key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  const token = event.headers['authorization']?.split(' ')[1]; // Expect "Bearer <token>"
  if (!token) {
    console.error('get-item-by-id: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
     };
  }

  // --- Verification using Supabase ---
  let userId;
  try {
    console.log('get-item-by-id: Verifying token with supabase.auth.getUser...');
    // Use the base Supabase client to get user info from token, which also verifies it
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError) {
        console.error('get-item-by-id: Supabase auth error during getUser:', userError);
        throw userError; // Propagate auth errors
    }
    if (!user) {
        console.error('get-item-by-id: User not found for the provided token');
        // This case might indicate a valid token for a deleted user
        throw new Error('User not found for the provided token');
    }

    userId = user.id;
    console.log('get-item-by-id: Token verified successfully via Supabase for user:', userId);

  } catch (error) {
    // Handle errors from supabase.auth.getUser
    console.error('get-item-by-id: Token verification failed via Supabase!', error);
    const statusCode = error.status === 401 ? 401 : (error.status || 403); // Use Supabase status or default to 403
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

  // --- Get Query Parameter ---
  const { customId } = event.queryStringParameters || {};
  if (!customId) {
    console.error('get-item-by-id: Missing customId query parameter.');
    return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Query parameter "customId" is required' }),
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  console.log(`get-item-by-id: Attempting to fetch item with custom_id: ${customId}`);
  try {
    // Use the base Supabase client (initialized with ANON key).
    // Supabase implicitly uses the authenticated user context (from getUser above)
    // for Row Level Security (RLS) checks on the 'items' table.
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('custom_id', customId) // Assuming 'custom_id' is the correct column name
      .single(); // Use single() to expect exactly one row or throw an error

    // Handle potential errors during the fetch
    if (error) {
        // Check if the error is because no rows were found (PGRST116 standard PostgREST code)
        if (error.code === 'PGRST116') {
            console.warn(`get-item-by-id: Item with custom_id "${customId}" not found.`);
            return {
                statusCode: 404,
                body: JSON.stringify({ error: `Item not found with customId: ${customId}` }),
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            };
        }
        // For other errors (like RLS blocking SELECT), rethrow to be caught below
        console.error(`get-item-by-id: Supabase fetch error for custom_id ${customId}:`, error);
        throw error;
    }

    // If data is returned, the fetch was successful
    // Note: .single() guarantees 'data' is not null if no error was thrown.
    console.log(`get-item-by-id: Item fetched successfully for custom_id: ${customId}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ data }), // Send the single item data object
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };

  } catch (error) {
    // Catch errors from Supabase fetch operation or unexpected issues
    console.error('get-item-by-id: Error fetching item data:', error.message, error.code ? `(Code: ${error.code})` : '');

    // Determine status code
    let statusCode = 500; // Internal Server Error by default
    if (error.code === '42501' /* permission denied */ || (error.message && error.message.toLowerCase().includes('rls'))) {
        statusCode = 403; // Forbidden (RLS)
    }
    // Add more specific error handling if needed

    return {
      statusCode: statusCode,
      body: JSON.stringify({ message: 'Failed to fetch item', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Fetch Item Data ---
};