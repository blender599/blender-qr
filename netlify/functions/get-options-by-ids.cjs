// get-options-by-ids.cjs
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
    console.error('get-options-by-ids: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
     };
  }

  // --- Verification using Supabase ---
  let userId;
  try {
    console.log('get-options-by-ids: Verifying token with supabase.auth.getUser...');
    // Use the base Supabase client to get user info from token, which also verifies it
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError) {
        console.error('get-options-by-ids: Supabase auth error during getUser:', userError);
        throw userError; // Propagate auth errors
    }
    if (!user) {
        console.error('get-options-by-ids: User not found for the provided token');
        throw new Error('User not found for the provided token');
    }

    userId = user.id;
    console.log('get-options-by-ids: Token verified successfully via Supabase for user:', userId);

  } catch (error) {
    // Handle errors from supabase.auth.getUser
    console.error('get-options-by-ids: Token verification failed via Supabase!', error);
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
  // This function expects POST based on reading event.body
  if (event.httpMethod !== 'POST') {
    console.warn(`get-options-by-ids: Method Not Allowed - ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Check HTTP Method ---


  // --- Parse Request Body ---
  let ids;
  try {
      console.log('get-options-by-ids: Raw event body:', event.body);
      const body = JSON.parse(event.body || '{}'); // Default to empty object if body is null/undefined
      ids = body.ids;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        console.error('get-options-by-ids: Invalid or empty "ids" array in request body.');
        throw new Error('"ids" array (non-empty) required in request body');
      }
      // Optional: Validate contents of ids array if needed (e.g., check if they are strings/numbers)
      console.log('get-options-by-ids: Parsed IDs for lookup:', ids);

  } catch (parseError) {
      console.error('get-options-by-ids: Failed to parse request body or invalid format:', parseError);
      return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid request body: ' + parseError.message }),
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      };
  }
  // --- End Parse Request Body ---


  // --- Fetch Options Data ---
  try {
    // Use the base Supabase client. RLS for 'options' table SELECT will apply
    // based on the implicitly authenticated user context from getUser above.
    console.log(`get-options-by-ids: Attempting to fetch options with ids: ${ids.join(', ')}`);
    const { data, error } = await supabase
      .from('options') // Make sure 'options' is your correct table name
      .select('*')
      .in('id', ids); // Assuming 'id' is the correct column name in 'options' table

    // Handle potential errors during the fetch
    if (error) {
      console.error(`get-options-by-ids: Supabase fetch error for ids ${ids.join(', ')}:`, error);
      // Check for RLS errors specifically if desired
      if (error.code === '42501' /* permission denied */ || (error.message && error.message.toLowerCase().includes('rls'))) {
          error.status = 403; // Set status for Forbidden
      }
      throw error; // Rethrow to be caught below
    }

    // Query succeeded, return the found options (might be an empty array if none match)
    console.log(`get-options-by-ids: Options fetched successfully for ids: ${ids.join(', ')}.`);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: data || [] }), // Return data (or empty array)
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };

  } catch (error) {
    // Catch errors from Supabase fetch operation or unexpected issues
    console.error('get-options-by-ids: Error fetching options data:', error.message, error.code ? `(Code: ${error.code})` : '');

    // Determine status code
    const statusCode = error.status || 500; // Use status from error if available, else 500

    return {
      statusCode: statusCode,
      body: JSON.stringify({ message: 'Failed to fetch options', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Fetch Options Data ---
};