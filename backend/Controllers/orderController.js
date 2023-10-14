const Order = require("../Models/OrderSchema");
const Cart = require("../Models/CartSchema");

const AddOrder = async (req, res) => {
  const {
    userID,
    address,
    distirct,
    city,
    mobilenumber,
    email,
    totalPrice,
    data,
  } = req.body;

  try {
    const order = new Order({
      userID,
      address,
      distirct,
      city,
      mobilenumber,
      email,
      totalPrice,
      product: data,
    });
    const result = await order.save();

    Cart.deleteMany({ userID: userID })
      .then(() => {
        console.log("Documents with userID deleted.");
      })
      .catch((err) => {
        console.error("Error deleting documents:", err);
      });

    res.status(200).json({ product: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetOrdersByID = async (req, res) => {
  const userID = req.params.id;
  try {
    const orders = await Order.find({ userID: userID }).exec();

    if (orders.length === 0) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  AddOrder,
  GetOrdersByID,
};
