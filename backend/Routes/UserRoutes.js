const express = require("express");
const router = express.Router();
const { loginUser, signupUser, allUsers } = require("../Controllers/userController");

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

//all users route
router.get("/allusers", allUsers); 

module.exports = router;
