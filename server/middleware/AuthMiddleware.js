const jwt = require("../lib/jwt");
const User = require("../models/User");

async function AuthMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token);

    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

module.exports = AuthMiddleware;
