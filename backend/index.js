const express = require("express");
const mongoose = require("mongoose");
//const userRoutes = require("./routes/user");

//express app
const app = express();

app.use(express.json());

app.listen(4000, () => {
  console.log("listening on 4000 port");
});
