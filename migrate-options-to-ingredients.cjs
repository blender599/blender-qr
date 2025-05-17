require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase env vars—check VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function migrateOptionsToIngredients() {
  try {
    console.log('Fetching options...');
    const { data: optionsData, error: fetchError } = await supabase
      .from('options')
      .select('id, options');

    if (fetchError) throw new Error(`Fetch failed: ${fetchError.message}`);
    if (!optionsData || optionsData.length === 0) {
      console.log('No options found to migrate.');
      return;
    }

    console.log(`Found ${optionsData.length} option categories.`);

    // Flatten options.options into ingredients
    const ingredients = [];
    for (const option of optionsData) {
      const optionItems = option.options || [];
      console.log(`Processing option ${option.id} with ${optionItems.length} items`);
      optionItems.forEach((item) => {
        ingredients.push({
          name: item.name,
          price_adjustment: item.priceAdjustment || 0, // Match your JSON key
          available: true, // Default
          allergens: null, // No allergen data in options.options
        });
      });
    }

    console.log(`Extracted ${ingredients.length} unique ingredients:`);
    console.log(ingredients);

    // Remove duplicates by name (case-insensitive)
    const uniqueIngredients = [];
    const seenNames = new Set();
    for (const ing of ingredients) {
      const nameLower = ing.name.toLowerCase();
      if (!seenNames.has(nameLower)) {
        seenNames.add(nameLower);
        uniqueIngredients.push(ing);
      }
    }

    console.log(`After deduplication: ${uniqueIngredients.length} ingredients.`);

    // Batch insert into ingredients table
    if (uniqueIngredients.length > 0) {
      const { error: insertError } = await supabase
        .from('ingredients')
        .insert(uniqueIngredients);

      if (insertError) throw new Error(`Insert failed: ${insertError.message}`);
      console.log(`Successfully inserted ${uniqueIngredients.length} ingredients.`);
    } else {
      console.log('No ingredients to insert after deduplication.');
    }

  } catch (error) {
    console.error('Migration error:', error.message);
  } finally {
    console.log('Migration complete.');
    process.exit(0);
  }
}

migrateOptionsToIngredients();