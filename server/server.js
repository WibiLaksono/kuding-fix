const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const User = require("./models/User");
const Listing = require("./models/Listing");
const Transaction = require("./models/Transaction");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

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

// Endpoint Register User
app.post("/auth/register", async (req, res) => {
  console.log("Request received at /auth/register:", req.body);
  const { username, first_name, last_name, email, phone_number, address, role, join_date, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      first_name,
      last_name,
      email,
      phone_number,
      address,
      role,
      join_date,
      password: hashedPassword
    });
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint Login User
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, "your_jwt_secret", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
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
