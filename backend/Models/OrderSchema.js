const mongooes = require("mongoose");

const Schema = mongooes.Schema;

const OrderSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distirct: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  mobilenumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  product: {
    type: Array,
  },
});

module.exports = mongooes.model("Orders", OrderSchema);
