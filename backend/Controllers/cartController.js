const Cart = require("../Models/CartSchema");
const Product = require("../Models/ProductSchema");

const AddProduct = async (req, res) => {
  const userID = req.params.id;
  const { productID, size, quantity } = req.body;

  const product = await Product.findById(productID);

  const productTile = product.title;
  const productPrice = product.price;
  const productImage = product.image == null ? "sfds" : product.image;

  try {
    const cart = new Cart({
      userID,
      productID,
      size,
      quantity,
      productTile,
      productPrice,
      productImage,
    });
    const result = await cart.save();
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetCart = async (req, res) => {
  const userID = req.params.id;

  try {
    const carts = await Cart.find({ userID: userID }).exec();

    if (carts.length === 0) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json({ carts });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { AddProduct, GetCart };
