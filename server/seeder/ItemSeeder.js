const Item = require("../models/Item");
const Category = require("../models/Category");

async function seedDatabase() {
  // Daftar kategori unik
  const categories = ["food", "beverage", "dessert", "topping"];

  // Insert kategori jika belum ada
  const categoryMap = {};
  for (const name of categories) {
    const [cat] = await Category.findOrCreate({ where: { name } });
    categoryMap[name] = cat.id;
  }

  const count = await Item.count();
  if (count === 0) {
    await Item.bulkCreate([
      { name: "Nasi Goreng", price: 20000, categoryId: categoryMap["food"] },
      { name: "Mie Ayam", price: 18000, categoryId: categoryMap["food"] },
      {
        name: "Es Teh Manis",
        price: 8000,
        categoryId: categoryMap["beverage"],
      },
      {
        name: "Jus Alpukat",
        price: 15000,
        categoryId: categoryMap["beverage"],
      },
      { name: "Coklat Keju", price: 12000, categoryId: categoryMap["dessert"] },
      {
        name: "Pisang Goreng",
        price: 10000,
        categoryId: categoryMap["dessert"],
      },
      { name: "Keju Parut", price: 5000, categoryId: categoryMap["topping"] },
      {
        name: "Susu Kental Manis",
        price: 4000,
        categoryId: categoryMap["topping"],
      },
      { name: "Ayam Geprek", price: 22000, categoryId: categoryMap["food"] },
      { name: "Teh Tarik", price: 10000, categoryId: categoryMap["beverage"] },
    ]);
    console.log("Seeder: Items berhasil dimasukkan.");
  } else {
    console.log("Seeder: Items sudah ada, tidak disisipkan ulang.");
  }
}

module.exports = seedDatabase;
