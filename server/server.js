const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const User = require("./models/User");
const Listing = require("./models/Listing");
const Transaction = require("./models/Transaction");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint Get Users (tanpa password)
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude password
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint Get Listings
app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.findAll({ include: { model: User, attributes: ["username", "email"] } });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint Get Transactions
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: User, as: "Buyer", attributes: ["username", "email"] },
        { model: User, as: "Seller", attributes: ["username", "email"] },
        { model: Listing, as: "Listing", attributes: ["title", "price"] },
      ],
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, async () => {
  await sequelize.sync(); // Sync database
  console.log(`Server running on http://localhost:${PORT}`);
});
