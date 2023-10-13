const mongooes = require("mongoose");

const Schema = mongooes.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongooes.model("Products", ProductSchema);
