require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  const token = event.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.error('get-allergens: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  let userId;
  try {
    console.log('get-allergens: Verifying token with supabase.auth.getUser...');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError) {
      console.error('get-allergens: Supabase auth error during getUser:', userError);
      throw userError;
    }
    if (!user) {
      console.error('get-allergens: User not found for the provided token');
      throw new Error('User not found for the provided token');
    }

    userId = user.id;
    console.log('get-allergens: Token verified successfully via Supabase for user:', userId);
  } catch (error) {
    console.error('get-allergens: Token verification failed via Supabase!', error);
    const statusCode = error.status === 401 ? 401 : (error.status || 403);
    return {
      statusCode: statusCode,
      body: JSON.stringify({
        error: 'Authentication failed',
        details: error.message,
        name: error.name || 'SupabaseAuthError',
      }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  try {
    console.log('get-allergens: Fetching all allergens...');
    const { data, error } = await supabase
      .from('allergens')
      .select('id, name, symbol_url');

    if (error) {
      console.error('get-allergens: Supabase fetch error:', error);
      throw error;
    }

    console.log('get-allergens: Allergens fetched successfully:', data);
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('get-allergens: Error fetching allergens:', error.message, error.code ? `(Code: ${error.code})` : '');
    const statusCode = error.code === '42501' ? 403 : 500;
    return {
      statusCode: statusCode,
      body: JSON.stringify({ message: 'Failed to fetch allergens', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};