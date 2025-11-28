const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET_KEY;

module.exports = {
  sign(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: "1d" });
  },
  verify(token) {
    return jwt.verify(token, SECRET);
  },
};
