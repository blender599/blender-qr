// get-times.cjs
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
    console.error('get-times: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
     };
  }

  // --- Verification using Supabase ---
  let userId;
  try {
    console.log('get-times: Verifying token with supabase.auth.getUser...');
    // Use the base Supabase client to get user info from token, which also verifies it
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError) {
        console.error('get-times: Supabase auth error during getUser:', userError);
        throw userError; // Propagate auth errors
    }
    if (!user) {
        console.error('get-times: User not found for the provided token');
        throw new Error('User not found for the provided token');
    }

    userId = user.id;
    console.log('get-times: Token verified successfully via Supabase for user:', userId);

  } catch (error) {
    // Handle errors from supabase.auth.getUser
    console.error('get-times: Token verification failed via Supabase!', error);
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
  // Assuming this function fetches all time records, it should likely be a GET request
  if (event.httpMethod !== 'GET') {
    console.warn(`get-times: Method Not Allowed - ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'GET', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Check HTTP Method ---

  // --- Fetch All Times Data ---
  try {
    // Use the base Supabase client. RLS for 'times' table SELECT will apply
    // based on the implicitly authenticated user context from getUser above.
    console.log('get-times: Attempting to fetch all records from "times" table...');
    const { data, error } = await supabase
      .from('times') // Make sure 'times' is your correct table name
      .select('*');

    // Handle potential errors during the fetch
    if (error) {
      console.error('get-times: Supabase fetch error:', error);
      // Check for RLS errors specifically if desired
      if (error.code === '42501' /* permission denied */ || (error.message && error.message.toLowerCase().includes('rls'))) {
          error.status = 403; // Set status for Forbidden
      }
      throw error; // Rethrow to be caught below
    }

    // Query succeeded, return the found records (might be an empty array)
    console.log(`get-times: Records fetched successfully.`);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data || [] }), // Return data (or empty array), keeping the { data: ... } structure
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };

  } catch (error) {
    // Catch errors from Supabase fetch operation or unexpected issues
    console.error('get-times: Error fetching times data:', error.message, error.code ? `(Code: ${error.code})` : '');

    // Determine status code
    const statusCode = error.status || 500; // Use status from error if available, else 500

    return {
      statusCode: statusCode,
      body: JSON.stringify({ message: 'Failed to fetch times data', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Fetch All Times Data ---
};