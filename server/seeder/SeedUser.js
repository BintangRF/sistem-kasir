const User = require("../models/User");
const bcrypt = require("bcrypt");

async function SeedUser() {
  const exists = await User.findOne({ where: { username: "admin" } });
  if (exists) {
    console.log("Admin sudah ada, dilewati.");
    return;
  }

  const hash = await bcrypt.hash("adminpassword123", 10);

  await User.create({
    username: "admin",
    password: hash,
  });

  console.log("Data Admin dibuat.");
}

module.exports = SeedUser;
