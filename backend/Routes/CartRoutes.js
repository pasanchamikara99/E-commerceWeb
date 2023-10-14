const express = require("express");
const router = express.Router();
const {
  AddProduct,
  GetCart,
  DeleteCart,
} = require("../Controllers/cartController");

router.post("/addProduct/:id", AddProduct);

router.get("/getCart/:id", GetCart);

// router.get("/getOneProduct/:id", getOneProduct);

router.delete("/deletecart/:id", DeleteCart);

// router.patch("/editProduct/:id", UpdateProduct);
module.exports = router;
