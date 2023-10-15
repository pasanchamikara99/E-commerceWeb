const express = require("express");
const router = express.Router();

const {
  loginUser,
  signupUser,
  allUsers,
  EditAddress,
  GetAllUsers,
} = require("../Controllers/userController");


router.post("/login", loginUser);

router.post("/signup", signupUser);

//all users route
router.get("/allusers", allUsers); 
router.patch("/editAddress/:id", EditAddress);

router.get("/getAllUsers", GetAllUsers);

module.exports = router;
