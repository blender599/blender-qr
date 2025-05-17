// update-times.cjs
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
    console.error('update-times: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
     };
  }

  // --- Verification using Supabase ---
  let userId;
  try {
    console.log('update-times: Verifying token with supabase.auth.getUser...');
    // Use the base Supabase client to get user info from token, which also verifies it
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError) {
        console.error('update-times: Supabase auth error during getUser:', userError);
        throw userError; // Propagate auth errors
    }
    if (!user) {
        console.error('update-times: User not found for the provided token');
        throw new Error('User not found for the provided token');
    }

    userId = user.id;
    console.log('update-times: Token verified successfully via Supabase for user:', userId);

  } catch (error) {
    // Handle errors from supabase.auth.getUser
    console.error('update-times: Token verification failed via Supabase!', error);
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
  if (event.httpMethod !== 'POST') {
    console.warn(`update-times: Method Not Allowed - ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Check HTTP Method ---

  // --- Process Upsert ---
  try {
    // --- Parse and Validate Request Body ---
    console.log('update-times: Raw event body:', event.body);
    let body;
    try {
        body = JSON.parse(event.body || '{}');
    } catch (parseError) {
        console.error('update-times: Failed to parse request body:', parseError);
        throw new Error('Invalid JSON body');
    }

    const { day, opening, closing } = body;
    console.log('update-times: Parsed data:', { day, opening, closing });

    // Basic validation for presence
    if (!day || opening === undefined || closing === undefined) { // Check opening/closing specifically for empty strings "" which might be valid if allowed
      console.error('update-times: Missing required fields (day, opening, closing).');
      throw new Error('Missing required fields: day, opening, closing');
    }

    // Validate time format (HH.MM using 24-hour format)
    // Allow empty string "" as potentially valid for "closed" state if needed, adjust regex if not.
    const timeRegex = /^([0-1]?[0-9]|2[0-3])\.[0-5][0-9]$/;
    if ((opening !== "" && !timeRegex.test(opening)) || (closing !== "" && !timeRegex.test(closing))) {
      console.error(`update-times: Invalid time format for opening (${opening}) or closing (${closing}). Use HH.MM or ""`);
      throw new Error('Invalid time format. Use HH.MM (e.g., 09.00) or empty string "" if applicable.');
    }
    // Optional: Add validation for 'day' (e.g., check against known days of the week)
    // const validDays = ['Monday', 'Tuesday', ...];
    // if (!validDays.includes(day)) { throw new Error(`Invalid day: ${day}`); }

    // --- End Parse and Validate Request Body ---


    // --- Create User-Specific Supabase Client ---
    // Pass the user's token for operations requiring user permissions (like upsert based on RLS)
    const userSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    // --- End User Client Creation ---

    // --- Perform Database Upsert ---
    // Upsert combines INSERT and UPDATE. RLS policies for both INSERT and UPDATE
    // on the 'times' table for the 'authenticated' role will be checked.
    // 'onConflict: 'day'' means if a row with the same 'day' exists, it will be updated; otherwise, inserted.
    console.log(`update-times: Attempting to upsert time for ${day} with user-specific client...`);
    const { data: result, error } = await userSupabase // Use userSupabase client
      .from('times') // Ensure 'times' is the correct table name
      .upsert({ day: day, opening: opening, closing: closing }, {
          onConflict: 'day', // Specify the constraint column name for conflict detection
          // ignoreDuplicates: false, // Default is false, meaning it performs update on conflict
       })
      .select(); // Select the inserted or updated row(s)

    // Handle potential errors during the upsert
    if (error) {
      console.error(`update-times: Supabase upsert error for day ${day}:`, error);
      // Check for specific errors like RLS violation (42501) or constraint violations
      if (error.code === '42501' || (error.message && error.message.toLowerCase().includes('rls'))) {
          error.status = 403; // Set status for Forbidden
      } else if (error.code === '23505') { // unique_violation (should be handled by upsert, but just in case)
          error.status = 409; // Conflict
      }
      throw error; // Propagate DB errors
    }

     // Check if the upsert operation returned data
    if (!result || result.length === 0) {
        // This case is less likely with upsert+select unless RLS *only* blocks the SELECT part
        console.warn(`update-times: Upsert for day ${day} completed but returned no data. Check SELECT RLS policy.`);
        // Depending on requirements, you might still return 200 OK or a specific status/message
        throw new Error(`Upsert for day ${day} seemed successful but failed to return data (possibly SELECT RLS issue).`);
    }
    // --- End Perform Database Upsert ---

    // --- Success ---
    console.log('update-times: Upsert successful for day:', day, 'Data:', result[0]);
    return {
      statusCode: 200,
      // Upsert + select typically returns an array containing the single affected row
      body: JSON.stringify({ message: 'Time updated successfully', data: result[0] }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
    // --- End Success ---

  } catch (error) {
    // Catch errors from parsing, validation, or Supabase operations
    console.error('update-times: Error processing upsert request:', error.message, error.code ? `(Code: ${error.code})` : '');

    // Determine appropriate status code
    let statusCode = 400; // Bad Request by default for validation errors
    if (error.message.includes('Invalid JSON body') || error.message.includes('Missing required fields') || error.message.includes('Invalid time format') || error.message.includes('Invalid day')) {
        statusCode = 400;
    } else if (error.status === 403 || error.code === '42501') {
        statusCode = 403; // Forbidden (RLS)
    } else if (error.status === 409 || error.code === '23505') {
        statusCode = 409; // Conflict
    } else if (error.code) { // Handle potential Supabase error codes if needed
        statusCode = 500; // Default Internal Server Error for unhandled DB errors
    } else {
        statusCode = 500; // Generic Internal Server Error
    }

    return {
      statusCode: statusCode,
      body: JSON.stringify({ message: 'Failed to process time update request', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
  // --- End Process Upsert ---
};