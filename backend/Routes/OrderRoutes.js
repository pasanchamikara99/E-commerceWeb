const express = require("express");
const router = express.Router();
const { AddOrder, GetOrdersByID } = require("../Controllers/orderController");

router.post("/addOrder", AddOrder);

router.get("/getOrders/:id", GetOrdersByID);
module.exports = router;
