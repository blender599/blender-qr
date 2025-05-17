require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const LOCAL_LOGO_DIR = process.env.LOCAL_LOGO_DIR || './public/logos';
const CLOUDINARY_FOLDER = 'bsn-cloud-kitchen-restaurants';

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_KEY (or VITE_SUPABASE_ANON_KEY)');
}
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error('Missing Cloudinary env vars—check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});
console.log('upload-restaurant-logos: Cloudinary configured.');

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
console.log('upload-restaurant-logos: Supabase client initialized.');

async function uploadRestaurantLogos() {
  try {
    // Read local logos directory
    const absoluteDir = path.resolve(LOCAL_LOGO_DIR);
    console.log(`upload-restaurant-logos: Reading logos from ${absoluteDir}...`);
    const files = await fs.readdir(absoluteDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
    
    if (imageFiles.length === 0) {
      console.warn('upload-restaurant-logos: No image files (.jpg, .jpeg, .png) found in', absoluteDir);
      return;
    }
    console.log(`upload-restaurant-logos: Found ${imageFiles.length} image files:`, imageFiles);

    // Fetch all restaurants from Supabase
    console.log('upload-restaurant-logos: Fetching restaurants from Supabase...');
    const { data: restaurants, error: fetchError } = await supabase
      .from('restaurants')
      .select('restaurant_id, logo_url');
    
    if (fetchError) {
      throw new Error(`Failed to fetch restaurants: ${fetchError.message}`);
    }
    if (!restaurants || restaurants.length === 0) {
      throw new Error('No restaurants found in the database');
    }
    console.log(`upload-restaurant-logos: Fetched ${restaurants.length} restaurants`);

    // Process each restaurant
    let updatedCount = 0;
    let skippedCount = 0;
    for (const restaurant of restaurants) {
      let localFileName = null;

      // If logo_url exists, try to extract the base filename
      if (restaurant.logo_url) {
        // Handle case where logo_url might be a full URL (e.g., from Cloudinary)
        localFileName = path.basename(restaurant.logo_url);
        // Remove query parameters if any (e.g., ?v=123)
        localFileName = localFileName.split('?')[0];
      }

      // Check if the file exists locally using the base filename
      if (localFileName && imageFiles.includes(localFileName)) {
        console.log(`upload-restaurant-logos: Matched local file ${localFileName} for restaurant "${restaurant.restaurant_id}" using logo_url`);
      } else {
        // Fallback: Try to match by restaurant_id
        localFileName = imageFiles.find(file =>
          file.startsWith(`${restaurant.restaurant_id}-`) ||
          file.startsWith(`logo-${restaurant.restaurant_id}-`) ||
          file === `${restaurant.restaurant_id}.${file.split('.').pop()}`
        );
        if (!localFileName) {
          console.warn(`upload-restaurant-logos: Local logo file not found for restaurant "${restaurant.restaurant_id}" (tried: ${localFileName || 'none'}). Skipping.`);
          skippedCount++;
          continue;
        }
        console.log(`upload-restaurant-logos: Matched local file ${localFileName} for restaurant "${restaurant.restaurant_id}" using restaurant_id fallback`);
      }

      const localFilePath = path.join(absoluteDir, localFileName);

      // Upload to Cloudinary using restaurant_id as part of public_id
      console.log(`upload-restaurant-logos: Uploading ${localFileName} for restaurant "${restaurant.restaurant_id}"...`);
      try {
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
          folder: CLOUDINARY_FOLDER,
          public_id: `${restaurant.restaurant_id}-${Date.now()}`,
          overwrite: true,
        });
        const cloudinaryUrl = uploadResult.secure_url;
        console.log(`upload-restaurant-logos: Uploaded ${localFileName} to Cloudinary: ${cloudinaryUrl}`);

        // Update logo_url in Supabase
        console.log(`upload-restaurant-logos: Updating logo_url for restaurant "${restaurant.restaurant_id}"...`);
        const { error: updateError } = await supabase
          .from('restaurants')
          .update({ logo_url: cloudinaryUrl })
          .eq('restaurant_id', restaurant.restaurant_id);

        if (updateError) {
          throw new Error(`Failed to update logo_url for restaurant "${restaurant.restaurant_id}": ${updateError.message}`);
        }
        console.log(`upload-restaurant-logos: Updated logo_url for restaurant "${restaurant.restaurant_id}"`);
        updatedCount++;
      } catch (uploadError) {
        console.error(`upload-restaurant-logos: Failed to upload ${localFileName} for restaurant "${restaurant.restaurant_id}":`, uploadError.message);
        throw uploadError;
      }
    }

    console.log(`upload-restaurant-logos: Completed! Updated ${updatedCount} restaurants, skipped ${skippedCount} due to missing local files.`);
  } catch (error) {
    console.error('upload-restaurant-logos: Error:', error.message);
    process.exit(1);
  }
}

// Run the script
uploadRestaurantLogos().then(() => {
  console.log('upload-restaurant-logos: Script execution finished.');
  process.exit(0);
});