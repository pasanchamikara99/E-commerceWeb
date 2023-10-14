const express = require("express");
const router = express.Router();
const {
  loginUser,
  signupUser,
  EditAddress,
} = require("../Controllers/userController");

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

router.patch("/editAddress/:id", EditAddress);

module.exports = router;
