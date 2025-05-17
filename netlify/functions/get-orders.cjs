// get-orders.cjs
require('dotenv').config(); // Consider removing this later if Step 3 works
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

// Config
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  const token = event.headers['authorization']?.split(' ')[1]; // Expect "Bearer <token>"
  if (!token) {
    console.log('get-orders: No token provided.'); // Log no token case
    return { statusCode: 401, body: JSON.stringify({ error: 'No token provided' }) };
  }

  // --- START DEBUG LOGGING ---
  const secretFromEnv = process.env.VITE_JWT_SECRET;
  console.log('get-orders: Checking JWT_SECRET...');
  if (secretFromEnv) {
      console.log('get-orders: JWT_SECRET found, length:', secretFromEnv.length);
      // Avoid logging the full secret, just confirm its presence and maybe length
  } else {
      console.error('get-orders: *** JWT_SECRET is MISSING or empty in environment! ***');
  }
  // console.log('get-orders: Received Token:', token); // Uncomment to log the token if needed, but be careful with sensitive data
  // --- END DEBUG LOGGING ---

  try {
    console.log('get-orders: Verifying token with supabase.auth.getUser...');
    // Use Supabase client to get user info from token, which also verifies it
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError) {
        // If Supabase verification fails (e.g., invalid signature, expired)
        throw userError;
    }
    if (!user) {
        // If token is valid but user doesn't exist or other issue
        throw new Error('User not found for the provided token');
    }

    console.log('get-orders: Token verified successfully via Supabase for user:', user.id);

} catch (error) {
    // Handle errors from supabase.auth.getUser
    console.error('get-orders: Token verification failed via Supabase!', error);
    return {
        // Use 401 for auth issues, 403 might be okay too
        statusCode: error.status === 401 ? 401 : 403,
        body: JSON.stringify({
            error: 'Authentication failed',
            details: error.message,
            name: error.name || 'SupabaseAuthError'
        })
    };
}

  // --- If verification succeeded, proceed ---
  try {
    console.log('get-orders: Verification passed. Fetching orders from Supabase...');
    const { data, error } = await supabase
      .from('orders')
      .select('*');

    if (error) {
        console.error('get-orders: Supabase fetch error:', error);
        throw error; // Let the main catch handle it
    }
    const orders = data || [];
    console.log('get-orders: Orders fetched successfully.');

    return {
      statusCode: 200,
      body: JSON.stringify({ data: orders }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('get-orders: Error fetching data:', error.message);
    return {
      statusCode: 500, // Or use error.status if available
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};