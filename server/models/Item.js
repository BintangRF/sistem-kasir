const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Category = require("./Category");

const Item = sequelize.define("Item", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Item.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Category.hasMany(Item, { foreignKey: "categoryId", as: "items" });

module.exports = Item;
