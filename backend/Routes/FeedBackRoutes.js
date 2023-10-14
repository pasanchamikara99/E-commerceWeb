const express = require("express");
const router = express.Router();
const { AddOrder, GetOrdersByID } = require("../Controllers/orderController");

router.post("/addFeedback", AddOrder);

router.get("/getOrdersByProduct/:id", GetOrdersByID);
module.exports = router;
