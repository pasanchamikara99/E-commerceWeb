const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  EditAddress,
  GetAllUsers,
} = require("../Controllers/userController");

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.patch("/editAddress/:id", EditAddress);

router.get("/getAllUsers", GetAllUsers);

module.exports = router;
