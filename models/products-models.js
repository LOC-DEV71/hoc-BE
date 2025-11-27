const mongoose = require("mongoose");
const slug = require("slugify");
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
