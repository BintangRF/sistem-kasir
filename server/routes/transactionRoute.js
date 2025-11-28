const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transactionController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.use(authMiddleware);

// GET all transactions
router.get("/", transactionController.getTransactions);

// POST a new transaction
router.post("/create", transactionController.postTransaction);

module.exports = router;
