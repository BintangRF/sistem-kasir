const Item = require("../models/Item");

async function seedItems(categoryMap) {
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

module.exports = seedItems;
