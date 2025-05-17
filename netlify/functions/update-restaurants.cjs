require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    console.warn(`update-restaurants: Method Not Allowed - ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  const token = event.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.error('update-restaurants: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  let userId;
  try {
    console.log('update-restaurants: Verifying token with supabase.auth.getUser...');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError) {
      console.error('update-restaurants: Supabase auth error during getUser:', userError);
      throw userError;
    }
    if (!user) {
      console.error('update-restaurants: User not found for the provided token');
      throw new Error('User not found for the provided token');
    }
    userId = user.id;
    console.log('update-restaurants: Token verified successfully via Supabase for user:', userId);
  } catch (error) {
    console.error('update-restaurants: Token verification failed via Supabase!', error);
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

  let requestData;
  try {
    console.log('update-restaurants: Raw event body:', event.body);
    try {
      requestData = JSON.parse(event.body || '{}');
    } catch (parseError) {
      console.error('update-restaurants: Failed to parse request body:', parseError);
      throw new Error('Invalid JSON body');
    }
    console.log('update-restaurants: Received data:', requestData);

    const { restaurant_id, category_name } = requestData;

    // Validate required fields
    if (!restaurant_id || !category_name) {
      console.error('update-restaurants: Missing or invalid required fields:', { restaurant_id, category_name });
      throw new Error('Missing or invalid required fields: restaurant_id and category_name are required');
    }

    // Fetch existing restaurant data
    const userSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: restaurant, error: fetchError } = await userSupabase
      .from('restaurants')
      .select('categories')
      .eq('restaurant_id', restaurant_id)
      .single();
    if (fetchError || !restaurant) {
      console.error('update-restaurants: Restaurant not found or inaccessible:', fetchError?.message || 'No restaurant');
      throw new Error(`Restaurant with ID ${restaurant_id} not found or inaccessible`);
    }

    // Append new category to categories array
    const updatedCategories = restaurant.categories || [];
    if (updatedCategories.includes(category_name)) {
      console.warn('update-restaurants: Category already exists:', category_name);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Category already exists, no changes made', data: restaurant }),
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      };
    }
    updatedCategories.push(category_name);

    // Update restaurant with new categories
    const { data, error } = await userSupabase
      .from('restaurants')
      .update({ categories: updatedCategories})
      .eq('restaurant_id', restaurant_id)
      .select()
      .single();

    if (error) {
      console.error('update-restaurants: Supabase update error:', error);
      throw error;
    }

    console.log('update-restaurants: Restaurant updated successfully:', data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Category added successfully', data }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('update-restaurants: Error processing update request:', error.message, error.code ? `(Code: ${error.code})` : '');
    let statusCode = 500;
    if (error.message.includes('Invalid JSON body') || error.message.includes('Missing or invalid required fields') || error.message.includes('Restaurant')) {
      statusCode = 400;
    } else if (error.code === '42501') {
      statusCode = 403;
      error.message = 'Update failed: Permission denied (RLS violation)';
    }

    return {
      statusCode,
      body: JSON.stringify({ message: 'Failed to add category', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};