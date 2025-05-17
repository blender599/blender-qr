require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { v2: cloudinary } = require('cloudinary');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.warn('add-item: Missing Cloudinary env vars. Image uploads will fail.');
}

if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
  });
  console.log('add-item: Cloudinary configured.');
} else {
  console.warn('add-item: Cloudinary NOT configured due to missing env vars.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    console.warn(`add-item: Method Not Allowed - ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  const token = event.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.error('add-item: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  let userId;
  try {
    console.log('add-item: Verifying token with supabase.auth.getUser...');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError) {
      console.error('add-item: Supabase auth error during getUser:', userError);
      throw userError;
    }
    if (!user) {
      console.error('add-item: User not found for the provided token');
      throw new Error('User not found for the provided token');
    }
    userId = user.id;
    console.log('add-item: Token verified successfully via Supabase for user:', userId);
  } catch (error) {
    console.error('add-item: Token verification failed via Supabase!', error);
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
    console.log('add-item: Raw event body:', event.body);
    try {
      requestData = JSON.parse(event.body || '{}');
    } catch (parseError) {
      console.error('add-item: Failed to parse request body:', parseError);
      throw new Error('Invalid JSON body');
    }
    console.log('add-item: Received data:', requestData);

    const {
      custom_id,
      restaurant_id,
      name,
      description,
      price,
      category,
      option_categories,
      available,
      allergens,
      imageBase64
    } = requestData;

    // Validate required fields
    if (!custom_id || !restaurant_id || !name || !category || isNaN(price) || price < 0) {
      console.error('add-item: Missing or invalid required fields:', { custom_id, restaurant_id, name, category, price });
      throw new Error('Missing or invalid required fields: custom_id, restaurant_id, name, category, and price are required');
    }

    // Validate restaurant_id exists and is accessible
    const userSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: restaurant, error: restaurantError } = await userSupabase
      .from('restaurants')
      .select('restaurant_id')
      .eq('restaurant_id', restaurant_id)
      .single();
    if (restaurantError || !restaurant) {
      console.error('add-item: Restaurant not found or inaccessible:', restaurantError?.message || 'No restaurant');
      throw new Error(`Restaurant with ID ${restaurant_id} not found or inaccessible`);
    }

    // Check for duplicate custom_id
    const { data: existingItem, error: existingError } = await userSupabase
      .from('items')
      .select('custom_id')
      .eq('custom_id', custom_id)
      .maybeSingle();
    if (existingError) {
      console.error('add-item: Error checking existing item:', existingError);
      throw new Error('Failed to verify item uniqueness');
    }
    if (existingItem) {
      console.error('add-item: Duplicate custom_id:', custom_id);
      throw new Error(`Item with custom_id ${custom_id} already exists`);
    }

    // Upload image to Cloudinary if provided
    let image_url = null;
    if (imageBase64) {
      console.log('add-item: imageBase64 detected, attempting Cloudinary upload...');
      if (!cloudinary.config().cloud_name) {
        console.error('add-item: Cloudinary is not configured. Cannot upload image.');
        throw new Error('Image upload failed: Cloudinary not configured on server.');
      }
      try {
        const uploadResult = await cloudinary.uploader.upload(imageBase64, {
          folder: 'bsn-cloud-kitchen',
          public_id: `${custom_id}-${Date.now()}`,
          overwrite: true,
        });
        image_url = uploadResult.secure_url;
        console.log('add-item: Uploaded image URL:', image_url);
      } catch (uploadError) {
        console.error('add-item: Cloudinary upload failed:', uploadError);
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }
    }

    // Prepare item data for insertion
    const itemFields = {
      custom_id,
      restaurant_id: Number(restaurant_id),
      name,
      description: description || null,
      price: Number(price),
      category,
      option_categories: Array.isArray(option_categories) ? option_categories : [],
      available: available ?? true,
      allergens: Array.isArray(allergens) ? allergens : [],
      image_url,
    };
    console.log('add-item: Fields to insert:', itemFields);

    // Insert item into items table
    console.log('add-item: Inserting item into Supabase...');
    const { data, error } = await userSupabase
      .from('items')
      .insert([itemFields])
      .select()
      .single();

    if (error) {
      console.error('add-item: Supabase insert error:', error);
      throw error;
    }

    console.log('add-item: Item inserted successfully:', data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item added successfully', data }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('add-item: Error processing add request:', error.message, error.code ? `(Code: ${error.code})` : '');
    let statusCode = 500;
    if (error.message.includes('Invalid JSON body') || error.message.includes('Missing or invalid required fields') || error.message.includes('Restaurant') || error.message.includes('custom_id')) {
      statusCode = 400;
    } else if (error.message.includes('Cloudinary') || error.message.includes('Image upload failed')) {
      statusCode = 500;
    } else if (error.code === '42501') {
      statusCode = 403;
      error.message = 'Insert failed: Permission denied (RLS violation)';
    } else if (error.code === '23505') {
      statusCode = 409;
      error.message = 'Insert failed: Duplicate custom_id';
    } else if (error.code === '23503') {
      statusCode = 400;
      error.message = 'Insert failed: Invalid foreign key (e.g., restaurant_id)';
    }

    return {
      statusCode,
      body: JSON.stringify({ message: 'Failed to add item', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};