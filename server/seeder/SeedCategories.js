const Category = require("../models/Category");

async function seedCategories() {
  const categories = ["food", "beverage", "dessert", "topping"];
  const categoryMap = {};

  for (const name of categories) {
    const [cat] = await Category.findOrCreate({ where: { name } });
    categoryMap[name] = cat.id;
  }

  console.log("Seeder: Categories berhasil dimasukkan/ada.");
  return categoryMap;
}

module.exports = seedCategories;
