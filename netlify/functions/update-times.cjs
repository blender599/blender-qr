require('dotenv').config(); // Keep if needed locally, consider removing for Netlify deployment
const { createClient } = require('@supabase/supabase-js');

// Config
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  const token = event.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.error('update-times: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  let userId;
  try {
    console.log('update-times: Verifying token with supabase.auth.getUser...');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError) {
      console.error('update-times: Supabase auth error during getUser:', userError);
      throw userError;
    }
    if (!user) {
      console.error('update-times: User not found for the provided token');
      throw new Error('User not found for the provided token');
    }

    userId = user.id;
    console.log('update-times: Token verified successfully via Supabase for user:', userId);
  } catch (error) {
    console.error('update-times: Token verification failed via Supabase!', error);
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

  if (event.httpMethod !== 'POST') {
    console.warn(`update-times: Method Not Allowed - ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  try {
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

    if (!day) {
      console.error('update-times: Missing required field: day.');
      throw new Error('Missing required field: day');
    }

    const timeRegex = /^([0-1]?[0-9]|2[0-3])\.[0-5][0-9]$/;
    const openingValue = opening === "" ? null : (timeRegex.test(opening) ? opening : null);
    const closingValue = closing === "" ? null : (timeRegex.test(closing) ? closing : null);

    if (openingValue === null && closingValue === null && opening !== "" && closing !== "") {
      console.error('update-times: Invalid time format for opening or closing.');
      throw new Error('Invalid time format. Use HH.MM (e.g., 09.00) or leave empty for NULL.');
    }

    const userSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    console.log(`update-times: Attempting to upsert time for ${day} with user-specific client...`);
    const { data: result, error } = await userSupabase
      .from('times')
      .upsert({ day: day, opening: openingValue, closing: closingValue }, {
        onConflict: 'day',
      })
      .select();

    if (error) {
      console.error(`update-times: Supabase upsert error for day ${day}:`, error);
      if (error.code === '42501' || (error.message && error.message.toLowerCase().includes('rls'))) {
        error.status = 403;
      } else if (error.code === '23505') {
        error.status = 409;
      }
      throw error;
    }

    if (!result || result.length === 0) {
      console.warn(`update-times: Upsert for day ${day} completed but returned no data. Check SELECT RLS policy.`);
      throw new Error(`Upsert for day ${day} seemed successful but failed to return data (possibly SELECT RLS issue).`);
    }

    console.log('update-times: Upsert successful for day:', day, 'Data:', result[0]);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Time updated successfully', data: result[0] }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('update-times: Error processing upsert request:', error.message, error.code ? `(Code: ${error.code})` : '');
    let statusCode = 400;
    if (error.message.includes('Invalid JSON body') || error.message.includes('Missing required field') || error.message.includes('Invalid time format')) {
      statusCode = 400;
    } else if (error.status === 403 || error.code === '42501') {
      statusCode = 403;
    } else if (error.status === 409 || error.code === '23505') {
      statusCode = 409;
    } else if (error.code) {
      statusCode = 500;
    } else {
      statusCode = 500;
    }

    return {
      statusCode: statusCode,
      body: JSON.stringify({ message: 'Failed to process time update request', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};