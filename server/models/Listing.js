const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Listing = sequelize.define("Listing", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { 
    type: DataTypes.STRING(11), 
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Judul produk tidak boleh kosong"
      },
      len: {
        args: [3, 11],
        msg: "Judul produk harus antara 3 sampai 11 karakter"
      }
    }
   },
  description: { type: DataTypes.STRING(26) },
  price: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [1000],
        msg: "Harga minimal 1000"
      }
    }
   },
  condition: { type: DataTypes.STRING(11) },
  status: { type: DataTypes.STRING(12) },
}, { tableName: "listing", timestamps: false });

Listing.belongsTo(User, { foreignKey: "user_id" });

module.exports = Listing;
