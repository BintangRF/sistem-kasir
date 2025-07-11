const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Transaction = sequelize.define("Transaction", {
  buyerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
  },
  amountReceived: {
    type: DataTypes.FLOAT,
  },
  transactionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Model untuk item di dalam transaksi
const TransactionItem = sequelize.define("TransactionItem", {
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

// Relasi: Satu Transaction memiliki banyak TransactionItem
Transaction.hasMany(TransactionItem, {
  as: "items",
  foreignKey: "TransactionId",
});
TransactionItem.belongsTo(Transaction, { foreignKey: "TransactionId" });

module.exports = { Transaction, TransactionItem };
