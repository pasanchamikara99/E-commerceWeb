const User = require("../Models/UserSchema");

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ email });

    // If the user is not found, return an error
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    if (password === user.password) {
      return res.status(200).json({ message: "Authentication successful" });
    } else {
      return res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { firstname, userType, email, password } = req.body;

  try {
    const user = await User.signup(firstname, userType, email, password);

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
