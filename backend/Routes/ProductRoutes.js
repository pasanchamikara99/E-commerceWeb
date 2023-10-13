const express = require("express");
const router = express.Router();
const {
  AddProduct,
  AllProducts,
  DeleteProduct,
  UpdateProduct,
  getOneProduct,
} = require("../Controllers/productController");

router.post("/addProduct", AddProduct);

//signup route
router.get("/getAllProduct", AllProducts);

router.get("/getOneProduct/:id", getOneProduct);

router.delete("/deleteProduct/:id", DeleteProduct);

router.patch("/editProduct/:id", UpdateProduct);
module.exports = router;
