const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Listing = require("./Listing");

const Transaction = sequelize.define("Transaction", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  buyer_id: { type: DataTypes.INTEGER, allowNull: false },
  seller_id: { type: DataTypes.INTEGER, allowNull: false },
  listing_id: { type: DataTypes.INTEGER, allowNull: false },
  transaction_date: { type: DataTypes.DATE },
  payment_status: { type: DataTypes.STRING(9) },
  shipping_status: { type: DataTypes.STRING(8) },
  shipping_address: { type: DataTypes.STRING(50) },
  total_amount: { type: DataTypes.INTEGER },
  payment_method: { type: DataTypes.STRING(13) },
}, { tableName: "transaction", timestamps: false });

Transaction.belongsTo(User, { foreignKey: "buyer_id", as: "Buyer" });
Transaction.belongsTo(User, { foreignKey: "seller_id", as: "Seller" });
Transaction.belongsTo(Listing, { foreignKey: "listing_id", as: "Listing" });

module.exports = Transaction;
