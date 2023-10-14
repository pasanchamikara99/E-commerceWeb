const express = require("express");
const router = express.Router();
const {
  AddProduct,
  GetCart,
  DeleteCart,
} = require("../Controllers/cartController");

router.post("/addProduct/:id", AddProduct);

router.get("/getCart/:id", GetCart);

router.delete("/deletecart/:id", DeleteCart);

module.exports = router;
