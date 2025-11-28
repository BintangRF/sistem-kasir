const seedCategories = require("./SeedCategories");
const seedItems = require("./SeedItems");
const SeedUser = require("./SeedUser");

async function seedDatabase() {
  const categoryMap = await seedCategories();
  await seedItems(categoryMap);
  await SeedUser();
}

module.exports = seedDatabase;
