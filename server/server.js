require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
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

// Database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection error:", err));

// Define model associations
User.hasMany(Listing, { foreignKey: "user_id" });
Listing.belongsTo(User, { foreignKey: "user_id" });
Transaction.belongsTo(User, { as: "BuyerUser", foreignKey: "buyer_id" }); // Rename alias
Transaction.belongsTo(User, { as: "SellerUser", foreignKey: "seller_id" }); // Rename alias
Transaction.belongsTo(Listing, { foreignKey: "listing_id" });

// Routes
app.get("/users", async (_, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/users/register", async (req, res) => {
  console.log("Request received at /users/register:", req.body);
  const { username, first_name, last_name, email, phone_number, address, role, join_date, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username, first_name, last_name, email, phone_number, address, role, join_date, password: hashedPassword
    });
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await User.findOne({ where: { email } });
    if (!users) return res.status(404).json({ error: "User not found" });
    
    const isPasswordValid = await bcrypt.compare(password, users.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid password" });
    
    const token = jwt.sign({ id: user.id, email: users.email }, "your_jwt_secret", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/listing", async (_, res) => {
  try {
    
    const listings = await Listing.findAll({ include: { model: User, attributes: ["username", "email"] } });
    console.log("Listings Data:", listings);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/listing/:id", async (req, res) => {
  try {
    console.log("Fetching product with ID:", req.params.id); // Debugging log
    const listing = await Listing.findByPk(req.params.id);
    if (!listing) {
      console.log("Product not found in database:", req.params.id);
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(listing);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: error.message });
  }
});


app.get("/transactions", async (_, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: User, as: "BuyerUser", attributes: ["username", "email"] },
        { model: User, as: "SellerUser", attributes: ["username", "email"] },
        { model: Listing, attributes: ["title", "price"] },
      ],
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
