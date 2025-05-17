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
    console.warn(`add-option: Method Not Allowed - ${event.httpMethod}`);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  const token = event.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.error('add-option: No token provided.');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No token provided' }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }

  let userId;
  try {
    console.log('add-option: Verifying token with supabase.auth.getUser...');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    if (userError) {
      console.error('add-option: Supabase auth error during getUser:', userError);
      throw userError;
    }
    if (!user) {
      console.error('add-option: User not found for the provided token');
      throw new Error('User not found for the provided token');
    }
    userId = user.id;
    console.log('add-option: Token verified successfully via Supabase for user:', userId);
  } catch (error) {
    console.error('add-option: Token verification failed via Supabase!', error);
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
    console.log('add-option: Raw event body:', event.body);
    try {
      requestData = JSON.parse(event.body || '{}');
    } catch (parseError) {
      console.error('add-option: Failed to parse request body:', parseError);
      throw new Error('Invalid JSON body');
    }
    console.log('add-option: Received data:', requestData);

    const { name, options, choice_type, is_mandatory } = requestData;

    // Validate required fields
    if (!name || !choice_type || is_mandatory === null || is_mandatory === undefined) {
      console.error('add-option: Missing or invalid required fields:', { name, choice_type, is_mandatory });
      throw new Error('Missing or invalid required fields: name, choice_type, and is_mandatory are required');
    }

    // Validate choice_type enum
    if (!['single', 'multi'].includes(choice_type)) {
      console.error('add-option: Invalid choice_type:', choice_type);
      throw new Error('choice_type must be either "single" or "multi"');
    }

    // Validate is_mandatory enum
    if (!['true', 'false'].includes(is_mandatory.toString())) {
      console.error('add-option: Invalid is_mandatory:', is_mandatory);
      throw new Error('is_mandatory must be either "true" or "false"');
    }

    // Validate options field
    if (!Array.isArray(options) || !options.every(opt => opt.name && typeof opt.priceAdjustment === 'number')) {
      console.error('add-option: Invalid options format:', options);
      throw new Error('options must be a valid array with name and priceAdjustment fields');
    }

    // Check for duplicate name
    const userSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: existingOption, error: existingError } = await userSupabase
      .from('options')
      .select('name')
      .eq('name', name)
      .maybeSingle();
    if (existingError) {
      console.error('add-option: Error checking existing option:', existingError);
      throw new Error('Failed to verify option uniqueness');
    }
    if (existingOption) {
      console.error('add-option: Duplicate name:', name);
      throw new Error(`Option with name ${name} already exists`);
    }

    // Prepare option data for insertion
    const optionFields = {
      name,
      options: options.length > 0 ? options : null,
      choice_type,
      is_mandatory: is_mandatory === 'true',
    };
    console.log('add-option: Fields to insert:', optionFields);

    // Insert option into options table
    console.log('add-option: Inserting option into Supabase...');
    const { data, error } = await userSupabase
      .from('options')
      .insert([optionFields])
      .select()
      .single();

    if (error) {
      console.error('add-option: Supabase insert error:', error);
      throw error;
    }

    console.log('add-option: Option inserted successfully:', data);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Option added successfully', data }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  } catch (error) {
    console.error('add-option: Error processing add request:', error.message, error.code ? `(Code: ${error.code})` : '');
    let statusCode = 500;
    if (error.message.includes('Invalid JSON body') || error.message.includes('Missing or invalid required fields') || error.message.includes('choice_type') || error.message.includes('is_mandatory') || error.message.includes('name') || error.message.includes('options')) {
      statusCode = 400;
    } else if (error.code === '42501') {
      statusCode = 403;
      error.message = 'Insert failed: Permission denied (RLS violation)';
    } else if (error.code === '23505') {
      statusCode = 409;
      error.message = 'Insert failed: Duplicate name';
    } else if (error.code === '23503') {
      statusCode = 400;
      error.message = 'Insert failed: Invalid foreign key';
    }

    return {
      statusCode,
      body: JSON.stringify({ message: 'Failed to add option', error: error.message }),
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    };
  }
};