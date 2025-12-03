const { Transaction, TransactionItem } = require("../models/Transaction");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: TransactionItem,
          as: "items",
        },
      ],
      order: [["transactionDate", "DESC"]],
    });

    res.status(200).json({
      data: transactions,
      message: "Transactions fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: null,
      message: error.message || "Error fetching transactions",
    });
  }
};

exports.postTransaction = async (req, res) => {
  try {
    const { buyerName, amountReceived, items, totalAmount } = req.body;

    if (amountReceived < totalAmount) {
      return res.status(400).json({
        data: null,
        message:
          "The amount of money not received may be less than the total payment.",
      });
    }

    const newTransaction = await Transaction.create(
      {
        buyerName,
        totalAmount,
        amountReceived,
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
      data: newTransaction,
      message: "Transaction created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      data: null,
      message: error.message || "Error creating transaction",
    });
  }
};
