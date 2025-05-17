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
  console.warn('add-restaurant: Missing Cloudinary env vars. Image uploads will fail.');
}

if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
  });
  console.log('add-restaurant: Cloudinary configured.');
} else {
  console.warn('add-restaurant: Cloudinary NOT configured due to missing env vars.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    console.warn(`add-restaurant: Method Not Allowed - ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  const token = event.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.error('add-restaurant: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  let userId;
  try {
    console.log('add-restaurant: Verifying token with supabase.auth.getUser...');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError) {
      console.error('add-restaurant: Supabase auth error during getUser:', userError);
      throw userError;
    }
    if (!user) {
      console.error('add-restaurant: User not found for the provided token');
      throw new Error('User not found for the provided token');
    }
    userId = user.id;
    console.log('add-restaurant: Token verified successfully via Supabase for user:', userId);
  } catch (error) {
    console.error('add-restaurant: Token verification failed via Supabase!', error);
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
    console.log('add-restaurant: Raw event body:', event.body);
    try {
      requestData = JSON.parse(event.body || '{}');
    } catch (parseError) {
      console.error('add-restaurant: Failed to parse request body:', parseError);
      throw new Error('Invalid JSON body');
    }
    console.log('add-restaurant: Received data:', requestData);

    const { name, logoBase64, categories } = requestData;

    // Validate required fields
    if (!name) {
      console.error('add-restaurant: Missing or invalid required fields:', { name });
      throw new Error('Missing or invalid required field: name is required');
    }

    // Validate categories
    if (!Array.isArray(categories)) {
      console.error('add-restaurant: Invalid categories format:', categories);
      throw new Error('categories must be a valid array of strings');
    }
    if (!categories.every(cat => typeof cat === 'string' && cat.trim())) {
      console.error('add-restaurant: Invalid category entries:', categories);
      throw new Error('All categories must be non-empty strings');
    }

    // Fetch all restaurants to determine the next restaurant_id
    const userSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: existingRestaurants, error: fetchError } = await userSupabase
      .from('restaurants')
      .select('restaurant_id');
    if (fetchError) {
      console.error('add-restaurant: Error fetching existing restaurants:', fetchError);
      throw new Error('Failed to fetch existing restaurants');
    }

    let newRestaurantId = 1;
    if (existingRestaurants.length > 0) {
      const maxId = Math.max(...existingRestaurants.map(r => r.restaurant_id));
      newRestaurantId = maxId + 1;
    }
    console.log('add-restaurant: Calculated new restaurant_id:', newRestaurantId);

    // Check for duplicate restaurant name
    const { data: existingRestaurant, error: existingError } = await userSupabase
      .from('restaurants')
      .select('name')
      .eq('name', name)
      .maybeSingle();
    if (existingError) {
      console.error('add-restaurant: Error checking existing restaurant:', existingError);
      throw new Error('Failed to verify restaurant uniqueness');
    }
    if (existingRestaurant) {
      console.error('add-restaurant: Duplicate name:', name);
      throw new Error(`Restaurant with name ${name} already exists`);
    }

    // Upload logo to Cloudinary if provided
    let logo_url = null;
    if (logoBase64) {
      console.log('add-restaurant: logoBase64 detected, attempting Cloudinary upload...');
      if (!cloudinary.config().cloud_name) {
        console.error('add-restaurant: Cloudinary is not configured. Cannot upload logo.');
        throw new Error('Logo upload failed: Cloudinary not configured on server.');
      }
      try {
        const uploadResult = await cloudinary.uploader.upload(logoBase64, {
          folder: 'bsn-cloud-kitchen-restaurants',
          public_id: `restaurant-${newRestaurantId}-${Date.now()}`,
          overwrite: true,
        });
        logo_url = uploadResult.secure_url;
        console.log('add-restaurant: Uploaded logo URL:', logo_url);
      } catch (uploadError) {
        console.error('add-restaurant: Cloudinary upload failed:', uploadError);
        throw new Error(`Logo upload failed: ${uploadError.message}`);
      }
    }

    // Prepare restaurant data for insertion
    const restaurantFields = {
      restaurant_id: newRestaurantId,
      name,
      logo_url,
      categories: categories.length > 0 ? categories : null,
    };
    console.log('add-restaurant: Fields to insert:', restaurantFields);

    // Insert restaurant into restaurants table
    console.log('add-restaurant: Inserting restaurant into Supabase...');
    const { data, error } = await userSupabase
      .from('restaurants')
      .insert([restaurantFields])
      .select()
      .single();

    if (error) {
      console.error('add-restaurant: Supabase insert error:', error);
      throw error;
    }

    console.log('add-restaurant: Restaurant inserted successfully:', data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Restaurant added successfully', data }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('add-restaurant: Error processing add request:', error.message, error.code ? `(Code: ${error.code})` : '');
    let statusCode = 500;
    if (error.message.includes('Invalid JSON body') || error.message.includes('Missing or invalid required field') || error.message.includes('categories') || error.message.includes('name')) {
      statusCode = 400;
    } else if (error.message.includes('Cloudinary') || error.message.includes('Logo upload failed')) {
      statusCode = 500;
    } else if (error.code === '42501') {
      statusCode = 403;
      error.message = 'Insert failed: Permission denied (RLS violation)';
    } else if (error.code === '23505') {
      statusCode = 409;
      error.message = 'Insert failed: Duplicate name';
    }

    return {
      statusCode,
      body: JSON.stringify({ message: 'Failed to add restaurant', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};