const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.use(authMiddleware);

router.post("/create", itemController.createItem);
router.get("/", itemController.getItems);
router.get("/:id", itemController.getItemsById);
router.put("/update/:id", itemController.updateItem);
router.delete("/delete/:id", itemController.deleteItem);

module.exports = router;
