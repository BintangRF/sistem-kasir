const express = require("express");
const sequelize = require("./db/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const transactionRoute = require("./routes/transactionRoute");
const itemRoute = require("./routes/itemRoute");
const categoryRoute = require("./routes/categoryRoute");
const authRoute = require("./routes/authRoute");
const seedDatabase = require("./seeder/SeedDatabase");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();

// Middleware
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FE_URL, credentials: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Backend from express" });
});

app.use("/api/transactions", transactionRoute);
app.use("/api/items", itemRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/auth", authRoute);

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
