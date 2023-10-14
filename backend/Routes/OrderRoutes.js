const express = require("express");
const router = express.Router();
const { AddOrder, GetOrdersByID } = require("../Controllers/orderController");

router.post("/addOrder", AddOrder);

router.get("/getOrders/:id", GetOrdersByID);

// router.get("/getOneProduct/:id", getOneProduct);

// router.delete("/deleteProduct/:id", DeleteProduct);

// router.patch("/editProduct/:id", UpdateProduct);
module.exports = router;
