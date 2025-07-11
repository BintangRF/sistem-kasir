const express = require("express");
const sequelize = require("./db/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const transactionRoute = require("./routes/transactionRoute");
const itemRoute = require("./routes/itemRoute");
const categoryRoute = require("./routes/categoryRoute");
const seedDatabase = require("./seeder/ItemSeeder");

require("dotenv").config();

const app = express();

// Middleware
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", transactionRoute);
app.use("/api", itemRoute);
app.use("/api", categoryRoute);

// Sequelize Connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Berhasil terhubung ke database");
    return sequelize.sync();
  })
  .then(async () => {
    await seedDatabase();
  })
  .catch((err) => {
    console.error("Tidak dapat konek ke database:", err);
  });

module.exports = app;
