// upload-items-to-fauna.cjs
const { Client, fql } = require('fauna');
require('dotenv').config();

const extractItems = async (client) => {
  const { restaurantMenus } = require('./src/data/menu.cjs');
  const itemsList = [];

  for (const restaurant of restaurantMenus) {
    for (const category of restaurant.categories) {
      for (const item of category.items) {
        const itemOptions = [];
        if (item.optionCategories) {
          for (const optCat of item.optionCategories) {
            const result = await client.query(fql`
              Collection("options").all().where(.name == ${optCat.name}).first()
            `);
            if (result.data) {
              itemOptions.push(result.data.id); // Fauna-generated ID
            } else {
              console.warn(`Option "${optCat.name}" not found for item "${item.name}"`);
            }
          }
        }
        itemsList.push({
          customId: item.id, // Our "dt-t-1"
          name: item.name,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl,
          category: item.category,
          restaurantId: restaurant.id,
          optionCategories: itemOptions,
          available: true,
        });
      }
    }
  }

  console.log('Extracted Items:', JSON.stringify(itemsList, null, 2));
  return itemsList;
};

const uploadItems = async () => {
  const client = new Client({ secret: process.env.FAUNA_API_KEY });

  try {
    console.log('FAUNA_API_KEY:', process.env.FAUNA_API_KEY ? 'Set' : 'Missing');
    await client.query(fql`
      if (!Collection.byName("items").exists()) {
        Collection.create({ name: "items" })
      }
    `);
    console.log('Items collection ready');

    const itemsList = await extractItems(client);
    for (const item of itemsList) {
      console.log(`Uploading: ${item.name}`);
      console.log('Item data:', JSON.stringify(item, null, 2));
      await client.query(fql`
        let existing = Collection("items").all()
          .where(.customId == ${item.customId} && .restaurantId == ${item.restaurantId})
          .first()
        if (existing != null) {
          existing.update(${item})
        } else {
          Collection("items").create(${item})
        }
      `);
    }
    console.log('Items uploaded successfully!');
  } catch (error) {
    console.error('Error uploading items:', error.message, error.stack);
  } finally {
    client.close();
  }
};

uploadItems();