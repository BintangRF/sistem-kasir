const seedCategories = require("./SeedCategories");
const seedItems = require("./SeedItems");

async function seedDatabase() {
  const categoryMap = await seedCategories();
  await seedItems(categoryMap);
}

module.exports = seedDatabase;
