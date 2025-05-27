require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const User = require("./models/User");
const Listing = require("./models/Listing");
const Transaction = require("./models/Transaction");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// Database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// Define model associations
User.hasMany(Listing, { foreignKey: "user_id" });
Listing.belongsTo(User, { foreignKey: "user_id" });
Transaction.belongsTo(User, { as: "BuyerUser", foreignKey: "buyer_id" }); // Rename alias
Transaction.belongsTo(User, { as: "SellerUser", foreignKey: "seller_id" }); // Rename alias
Transaction.belongsTo(Listing, { foreignKey: "listing_id" });

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.get("/users", async (_, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Access denied. No token provided." });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token format." });

  jwt.verify(token, "your_jwt_secret", async (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token." });

    try {
      const user = await User.findByPk(decoded.id, { attributes: { exclude: ["password"] } });
      if (!user) return res.status(404).json({ error: "User not found." });

      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ error: "Internal server error." });
    }
  });
};


app.get("/users/me", authenticateToken, (req, res) => {
  res.json(req.user);
});


app.post("/users/register", async (req, res) => {
  console.log("Incoming request: POST /users/register");
  console.log("Request body:", req.body);
  const {
    username,
    first_name,
    last_name,
    email,
    phone_number,
    address,
    role,
    join_date,
    password,
  } = req.body;
  try {
    console.log("Password before hashing:", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password after hashing:", hashedPassword);

    const newUser = await User.create({
      username,
      first_name,
      last_name,
      email,
      phone_number,
      address,
      role,
      join_date,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Request body:", req.body);

  try {
    console.log("Mencari user dengan email:", email);
    const user = await User.findOne({ where: { email } }); // Gunakan 'user' bukan 'users'

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User ditemukan:", user);
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid){
      return res.status(401).json({ error: "Invalid password" });
    }

    console.log("Membuat token untuk user:", user.id);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    console.log("Token generated:", token);
    res.json({ message: "Login successful", token });

  } catch (error) {
    console.log("Login error:", error); 
    res.status(500).json({ error: error.message });
  }
});

app.post("/listing", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ error: "Hanya seller yang bisa menambahkan produk" });
    }

    const newListing = await Listing.create({
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      condition: req.body.condition,
      status: "active"
    });

    res.status(201).json(newListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ 
      error: "Gagal menambahkan produk",
      details: error.message 
    });
  }
});

app.get("/listing", async (req, res) => {
  try {
    const { q } = req.query;
    const where = {};
    if (q) {
      where.title = { [Sequelize.Op.like]: `%${q}%` };
    }
    const listings = await Listing.findAll({
      where,
      include: [{
        model: User,
        attributes: ["address"], // Pastikan address diambil
      }],
    });

    res.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({ error: error.message });
  }
});


app.get("/listing/:id", async (req, res) => {
  try {
    console.log("Fetching product with ID:", req.params.id);

    // Ambil data produk sekaligus dengan informasi user pemiliknya
    const listing = await Listing.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ["username", "email", "phone_number", "address"], // Ambil informasi tambahan dari user
      },
    });

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
// Tambahin di server.js (atau app.js, sesuai kode lo)
app.get('/health', (req, res) => {
  res.status(200).send('OK'); // <-- HARUS status 200!
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

