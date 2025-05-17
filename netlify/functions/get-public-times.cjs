// get-public-times.cjs
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Config
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async () => {
  try {
    const serverUTC = new Date(); // Raw UTC from Netlify
    const serverIST = new Date(serverUTC.getTime() + 3 * 60 * 60 * 1000); // GMT+3

    const { data, error } = await supabase
      .from('times')
      .select('*');

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({
        times: data || [],
        serverTime: serverUTC.toISOString(), // ISO string (e.g., "2025-03-12T17:06:00Z")
      }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('Server: Error fetching times:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch times' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};