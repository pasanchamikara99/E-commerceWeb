const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/UserRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const cartRoutes = require("./Routes/CartRoutes");
const orderRoutes = require("./Routes/OrderRoutes");
const cors = require("cors");

//express app
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoutes);

app.use("/api/v1/product", productRoutes);

app.use("/api/v1/cart", cartRoutes);

app.use("/api/v1/order", orderRoutes);

mongoose
  .connect(
    "mongodb+srv://pasan:990108@fashionshop.ft68co6.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(4000, () => {
      console.log("this app listen on port 4000");
      console.log("this app connect to the database");
    });
  })
  .catch((error) => {
    console.log(error);
  });
