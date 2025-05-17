require('dotenv').config(); // Keep if needed locally, consider removing for Netlify deployment
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
    console.error('get-restaurants: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
     };
  }

  // --- Verification using Supabase ---
  let userId;
  try {
    console.log('get-restaurants: Verifying token with supabase.auth.getUser...');
    // Use the base Supabase client to get user info from token, which also verifies it
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError) {
        console.error('get-restaurants: Supabase auth error during getUser:', userError);
        throw userError; // Propagate auth errors
    }
    if (!user) {
        console.error('get-restaurants: User not found for the provided token');
        throw new Error('User not found for the provided token');
    }

    userId = user.id;
    console.log('get-restaurants: Token verified successfully via Supabase for user:', userId);

  } catch (error) {
    // Handle errors from supabase.auth.getUser
    console.error('get-restaurants: Token verification failed via Supabase!', error);
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

  // --- Check HTTP Method ---
  // Assuming this function fetches all restaurant records, it should likely be a GET request
  if (event.httpMethod !== 'GET') {
    console.warn(`get-restaurants: Method Not Allowed - ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'GET', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Check HTTP Method ---

  // --- Fetch All Restaurants Data ---
  try {
    // Use the base Supabase client. RLS for 'restaurants' table SELECT will apply
    // based on the implicitly authenticated user context from getUser above.
    console.log('get-restaurants: Attempting to fetch all records from "restaurants" table...');
    const { data, error } = await supabase
      .from('restaurants') // Query the 'restaurants' table
      .select('*');

    // Handle potential errors during the fetch
    if (error) {
      console.error('get-restaurants: Supabase fetch error:', error);
      // Check for RLS errors specifically if desired
      if (error.code === '42501' /* permission denied */ || (error.message && error.message.toLowerCase().includes('rls'))) {
          error.status = 403; // Set status for Forbidden
      }
      throw error; // Rethrow to be caught below
    }

    // Query succeeded, return the found records (might be an empty array)
    console.log(`get-restaurants: Records fetched successfully.`);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data || [] }), // Return data (or empty array), keeping the { data: ... } structure
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };

  } catch (error) {
    // Catch errors from Supabase fetch operation or unexpected issues
    console.error('get-restaurants: Error fetching restaurants data:', error.message, error.code ? `(Code: ${error.code})` : '');

    // Determine status code
    const statusCode = error.status || 500; // Use status from error if available, else 500

    return {
      statusCode: statusCode,
      body: JSON.stringify({ message: 'Failed to fetch restaurants data', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Fetch All Restaurants Data ---
};