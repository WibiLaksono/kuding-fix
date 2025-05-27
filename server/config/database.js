const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "wrpl",                // <-- lebih fleksibel pakai env, default fallback
  process.env.DB_USER || "root",                // <-- ambil dari env, fallback root
  process.env.DB_PASSWORD || "",         // <-- ambil dari env, fallback 'example'
  {
    host: process.env.DB_HOST || "db",          // <-- HARUS 'db' di Docker!
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,          // <-- pastikan default 3306
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();             // Auth dulu, sync belakangan biar error jelas
    console.log("✅ Connected to MySQL Database!");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
    process.exit(1); // Biar container mati kalo gak connect DB
  }
})();

module.exports = sequelize;
