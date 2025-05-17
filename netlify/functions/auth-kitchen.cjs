// .netlify/functions/auth-kitchen.cjs
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_KEY;
const KITCHEN_USERNAME = process.env.KITCHEN_USERNAME;
const KITCHEN_PASSWORD = process.env.KITCHEN_PASSWORD;
const JWT_SECRET= process.env.VITE_JWT_SECRET;
console.log('Env vars:', {
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY: SUPABASE_SERVICE_KEY ? 'loaded' : 'missing',
  KITCHEN_USERNAME,
  KITCHEN_PASSWORD,
  JWT_SECRET,
});

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !KITCHEN_USERNAME || !KITCHEN_PASSWORD) {
  throw new Error('Missing env vars—check SUPABASE_URL, SUPABASE_SERVICE_KEY, KITCHEN_USERNAME, KITCHEN_PASSWORD');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    if (username !== KITCHEN_USERNAME || password !== KITCHEN_PASSWORD) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid username or password' }),
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      };
    }

    const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
      email: `${username}@gmail.com`, // e.g., ozanbasaran@yourdomain.com
      password: KITCHEN_PASSWORD,
    });

    if (signInError || !sessionData.session) throw new Error('Failed to generate session: ' + (signInError?.message || 'Unknown error'));

    const token = sessionData.session.access_token;
    console.log('Generated token:', token);

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('Auth error:', error.message);
    return {
      statusCode: 401,
      body: JSON.stringify({ error: error.message || 'Login failed' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};