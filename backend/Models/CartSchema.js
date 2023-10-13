const mongooes = require("mongoose");

const Schema = mongooes.Schema;

const CartSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  productID: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: false,
  },
  productTile: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: false,
  },
});

module.exports = mongooes.model("Cart", CartSchema);
