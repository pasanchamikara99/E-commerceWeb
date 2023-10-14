const Order = require("../Models/OrderSchema");

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
    res.status(200).json({ product: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  AddOrder,
};
