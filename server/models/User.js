const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(50), allowNull: false },
  first_name: { type: DataTypes.STRING(50), allowNull: false },
  last_name: { type: DataTypes.STRING(50), allowNull: false },
  email: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  phone_number: { type: DataTypes.STRING(50) },
  password: { type: DataTypes.STRING(255), allowNull: false }, 
  address: { type: DataTypes.TEXT },
  role: { type: DataTypes.STRING(6) },
  join_date: { type: DataTypes.DATE },
}, { tableName: "user", timestamps: false });

module.exports = User;
