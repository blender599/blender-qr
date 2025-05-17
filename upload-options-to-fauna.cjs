// upload-options-to-fauna.cjs
const { Client, fql } = require('fauna');
require('dotenv').config();

const extractOptions = () => {
  const { restaurantMenus } = require('./src/data/menu.cjs');
  const optionMap = new Map();

  restaurantMenus.forEach(restaurant => {
    restaurant.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.optionCategories) {
          item.optionCategories.forEach(optCat => {
            const key = `${optCat.name}-${optCat.choiceType}-${optCat.isMandatory}`;
            if (!optionMap.has(key)) {
              optionMap.set(key, {
                name: optCat.name,
                options: optCat.options.map(opt => ({
                  name: opt.name,
                  priceAdjustment: opt.priceAdjustment,
                })),
                choiceType: optCat.choiceType,
                isMandatory: optCat.isMandatory,
              });
            } else {
              const existing = optionMap.get(key);
              optCat.options.forEach(opt => {
                if (!existing.options.some(o => o.name === opt.name && o.priceAdjustment === opt.priceAdjustment)) {
                  existing.options.push({
                    name: opt.name,
                    priceAdjustment: opt.priceAdjustment,
                  });
                }
              });
            }
          });
        }
      });
    });
  });

  // No id field—let Fauna generate it
  return Array.from(optionMap.values());
};

const uploadOptions = async () => {
  const client = new Client({ secret: process.env.FAUNA_API_KEY });
  const optionsList = extractOptions();

  try {
    // Create options collection if not exists
    await client.query(fql`
      if (!Collection.byName("options").exists()) {
        Collection.create({ name: "options" })
      }
    `);

    for (const opt of optionsList) {
      console.log(`Uploading: ${opt.name}`);
      // Use name as unique check instead of id
      await client.query(fql`
        let existing = Collection("options").all().where(.name == ${opt.name}).first()
        if (existing != null) {
          existing.update(${opt})
        } else {
          Collection("options").create(${opt})
        }
      `);
    }
    console.log('Options uploaded successfully!');
  } catch (error) {
    console.error('Error uploading options:', error.message);
  } finally {
    client.close();
  }
};

uploadOptions();