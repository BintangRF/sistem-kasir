const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transactionController");

// GET all transactions
router.get("/transactions", transactionController.getTransactions);

// POST a new transaction
router.post("/transactions", transactionController.postTransaction);

module.exports = router;
