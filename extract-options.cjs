const { restaurantMenus } = require('./src/data/menu.cjs'); // Point to new JS file

const extractOptions = () => {
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

  const optionsList = Array.from(optionMap.values()).map((opt, index) => ({
    id: `opt_${index + 1}`,
    ...opt,
  }));

  console.log('Extracted Options:', JSON.stringify(optionsList, null, 2));
  return optionsList;
};

extractOptions();