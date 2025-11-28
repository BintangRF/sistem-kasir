const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const User = require("../models/User");

exports.authLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Wrong Password" });

    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ message: "Login Success!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.authLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  return res.json({ message: "Logout success" });
};

exports.authProfile = (req, res) => {
  const user = req.user;

  res.json({
    id: user.id,
    username: user.username,
  });
};
