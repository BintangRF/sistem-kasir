const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/login", authController.authLogin);
router.post("/logout", authController.authLogout);
router.get("/profile", authMiddleware, authController.authProfile);

module.exports = router;
