const express = require("express");
const router = express.Router();
const {
  AddOrder,
  //   AllProducts,
  //   DeleteProduct,
  //   UpdateProduct,
  //   getOneProduct,
} = require("../Controllers/orderController");

router.post("/addOrder", AddOrder);

// //signup route
// router.get("/getAllProduct", AllProducts);

// router.get("/getOneProduct/:id", getOneProduct);

// router.delete("/deleteProduct/:id", DeleteProduct);

// router.patch("/editProduct/:id", UpdateProduct);
module.exports = router;
