// get-items.cjs
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  try {
    const token = event.headers['authorization']?.split(' ')[1];
    if (!token) {
      return { statusCode: 401, body: JSON.stringify({ error: 'No token provided' }) };
    }
    // Add your JWT verify here if needed

    const { data, error } = await supabase
      .from('items')
      .select('*')
      .range(0, 9999); // Big page size to get all items

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};