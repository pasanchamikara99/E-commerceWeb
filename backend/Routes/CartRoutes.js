const express = require("express");
const router = express.Router();
const { AddProduct, GetCart } = require("../Controllers/cartController");

router.post("/addProduct/:id", AddProduct);

router.get("/getCart/:id", GetCart);

// router.get("/getOneProduct/:id", getOneProduct);

// router.delete("/deleteProduct/:id", DeleteProduct);

// router.patch("/editProduct/:id", UpdateProduct);
module.exports = router;
