const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("wrpl", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT,
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL Database!");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
})();

module.exports = sequelize;
