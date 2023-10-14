const express = require("express");
const router = express.Router();
const { AddOrder, GetOrdersByID, getAllOrders } = require("../Controllers/orderController");

router.post("/addOrder", AddOrder);

router.get("/getOrders/:id", GetOrdersByID);

router.get("/getAllOrders", getAllOrders);
module.exports = router;
