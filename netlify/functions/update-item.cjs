// update-item.cjs
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
  console.warn('update-item: Missing Cloudinary env vars. Image uploads will fail.');
}

if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
  });
  console.log('update-item: Cloudinary configured.');
} else {
  console.warn('update-item: Cloudinary NOT configured due to missing env vars.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  const token = event.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.error('update-item: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  let userId;
  try {
    console.log('update-item: Verifying token with supabase.auth.getUser...');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError) {
      console.error('update-item: Supabase auth error during getUser:', userError);
      throw userError;
    }
    if (!user) {
      console.error('update-item: User not found for the provided token');
      throw new Error('User not found for the provided token');
    }

    userId = user.id;
    console.log('update-item: Token verified successfully via Supabase for user:', userId);

  } catch (error) {
    console.error('update-item: Token verification failed via Supabase!', error);
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
    console.warn(`update-item: Method Not Allowed - ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  let requestData;
  try {
    console.log('update-item: Raw event body:', event.body);
    try {
      requestData = JSON.parse(event.body || '{}');
    } catch (parseError) {
      console.error('update-item: Failed to parse request body:', parseError);
      throw new Error('Invalid JSON body');
    }
    console.log('update-item: Received data:', requestData);

    if (!requestData.custom_id) {
      console.error('update-item: Missing custom_id in request body.');
      throw new Error('Missing "custom_id" in request body');
    }

    let image_url = requestData.image_url;
    if (requestData.imageBase64) {
      console.log('update-item: imageBase64 detected, attempting Cloudinary upload...');
      if (!cloudinary.config().cloud_name) {
        console.error('update-item: Cloudinary is not configured. Cannot upload image.');
        throw new Error('Image upload failed: Cloudinary not configured on server.');
      }
      try {
        const uploadResult = await cloudinary.uploader.upload(requestData.imageBase64, {
          folder: 'bsn-cloud-kitchen',
          public_id: `${requestData.custom_id}-${Date.now()}`,
          overwrite: true,
        });
        image_url = uploadResult.secure_url;
        console.log('update-item: Uploaded image URL:', image_url);
      } catch (uploadError) {
        console.error('update-item: Cloudinary upload failed:', uploadError);
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }
    }

    const updateFields = {};
    const allowedFields = ['name', 'description', 'price', 'option_categories', 'available', 'allergens'];
        allowedFields.forEach(field => {
      if (requestData[field] !== undefined) {
        updateFields[field] = requestData[field];
      }
    });
    if (image_url !== undefined) {
      updateFields.image_url = image_url;
    }
    updateFields.updated_at = new Date().toISOString();

    if (Object.keys(updateFields).length === 1 && updateFields.updated_at) {
      console.warn('update-item: No valid fields provided for update beyond updated_at.');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No fields to update provided' }),
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      };
    }
    console.log('update-item: Fields to update:', updateFields);
    console.log('update-item: Matching custom_id:', requestData.custom_id);

    const userSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    console.log(`update-item: Attempting to update item ${requestData.custom_id} with user-specific client...`);
    const { data: beforeData, error: beforeError } = await userSupabase
      .from('items')
      .select('*')
      .eq('custom_id', requestData.custom_id)
      .single();
    console.log('update-item: Before:', { data: beforeData, error: beforeError });

    const { data: roleData, error: roleError } = await userSupabase.rpc('get_auth_role');
    console.log('update-item: Auth Role:', { roleData, roleError });

    const { data: result, error } = await userSupabase
      .from('items')
      .update(updateFields)
      .eq('custom_id', requestData.custom_id)
      .select();

    if (error) {
      console.error(`update-item: Supabase update error for item ${requestData.custom_id}:`, error);
      throw error;
    }

    if (!result || result.length === 0) {
      console.warn(`update-item: Update for item ${requestData.custom_id} returned no data. Checking if item exists...`);
      const { data: existingItem, error: fetchError } = await userSupabase
        .from('items')
        .select('custom_id')
        .eq('custom_id', requestData.custom_id)
        .maybeSingle();

      if (fetchError) {
        console.error(`update-item: Error checking existence for item ${requestData.custom_id}:`, fetchError);
        throw new Error(`Update failed for item ${requestData.custom_id} and existence check also failed.`);
      }
      if (!existingItem) {
        console.error(`update-item: Item ${requestData.custom_id} not found.`);
        const notFoundError = new Error(`Item with custom_id ${requestData.custom_id} not found.`);
        notFoundError.status = 404;
        throw notFoundError;
      } else {
        console.warn(`update-item: Item ${requestData.custom_id} exists but update returned no data. Possible RLS block.`);
        throw new Error(`Update failed for item ${requestData.custom_id}, likely due to permissions (RLS).`);
      }
    }

    console.log('update-item: After:', { data: result, error });
    console.log('update-item: Updated item:', result[0]);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Item updated successfully', data: result[0] }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };

  } catch (error) {
    console.error('update-item: Error processing update request:', error.message, error.code ? `(Code: ${error.code})` : '');

    let statusCode = 400;
    if (error.message.includes('Invalid JSON body') || error.message.includes('Missing "custom_id"') || error.message.includes('No fields to update')) {
      statusCode = 400;
    } else if (error.message.includes('Cloudinary') || error.message.includes('Image upload failed')) {
      statusCode = 500;
    } else if (error.status === 404 || (error.message && error.message.includes('not found'))) {
      statusCode = 404;
    } else if (error.message.includes('RLS') || error.code === '42501') {
      statusCode = 403;
    } else if (error.code) {
      statusCode = 500;
    } else {
      statusCode = 500;
    }

    return {
      statusCode: statusCode,
      body: JSON.stringify({ message: 'Failed to process update request', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};