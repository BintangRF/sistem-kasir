const { Transaction, TransactionItem } = require("../models/Transaction");

exports.getTransactions = async (req, res) => {
  try {
    let transactions = await Transaction.findAll({
      include: [
        {
          model: TransactionItem,
          as: "items",
        },
      ],
      Transaction: [["transactionDate", "DESC"]],
    });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

exports.postTransaction = async (req, res) => {
  try {
    const { buyerName, amountReceived, items, totalAmount, transactionDate } =
      req.body;

    const newTransaction = await Transaction.create(
      {
        buyerName,
        totalAmount,
        amountReceived,
        transactionDate,
        items: items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: TransactionItem, as: "items" }],
      }
    );

    res.status(201).json({
      message: "Transaction created successfully",
      Transaction: newTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating transaction" });
  }
};
