const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Listing = sequelize.define("Listing", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING(11), allowNull: false },
  description: { type: DataTypes.STRING(26) },
  price: { type: DataTypes.INTEGER },
  condition: { type: DataTypes.STRING(11) },
  status: { type: DataTypes.STRING(12) },
}, { tableName: "listing", timestamps: false });

Listing.belongsTo(User, { foreignKey: "user_id" });

module.exports = Listing;
