const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.use(authMiddleware);

router.post("/create", categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
