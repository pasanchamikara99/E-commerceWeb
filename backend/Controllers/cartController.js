const Cart = require("../Models/CartSchema");
const Product = require("../Models/ProductSchema");

const AddProduct = async (req, res) => {
  const userID = req.params.id;
  const { productID, selectedSize, quantity } = req.body;

  const product = await Product.findById(productID);

  const productTile = product.title;
  const productPrice = product.price;
  const productImage = product.imageLink;

  try {
    const cart = new Cart({
      userID,
      productID,
      size: selectedSize,
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

const DeleteCart = async (req, res) => {
  const id = req.params.id;

  await Cart.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send("Product Deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Delete Failed");
    });
};

module.exports = { AddProduct, GetCart, DeleteCart };
