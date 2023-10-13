const Product = require("../Models/ProductSchema");

const AddProduct = async (req, res) => {
  const { title, price, image, gender, quantity } = req.body;

  try {
    const product = new Product({ title, price, image, gender, quantity });
    const result = await product.save();

    res.status(200).json({ product: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const AllProducts = async (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

const DeleteProduct = async (req, res) => {
  const id = req.params.id;
  await Product.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send("Product Deleted");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Delete Failed");
    });
};

const UpdateProduct = async (req, res) => {
  const id = req.params.id;
  const { title, price, image, gender, quantity } = req.body;
  let updatedProduct = {
    title,
    price,
    image,
    gender,
    quantity,
  };
  await Product.findByIdAndUpdate(id, updatedProduct)
    .then(() => {
      res.status(200).json("Product Updated");
    })
    .catch((err) => {
      console.log(err);
      res.send(500).send("Update Failed");
    });
};

const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).send("Product Not Found");
  }
};

module.exports = {
  AddProduct,
  AllProducts,
  DeleteProduct,
  UpdateProduct,
  getOneProduct,
};
