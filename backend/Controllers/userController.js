const User = require("../Models/UserSchema");

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
