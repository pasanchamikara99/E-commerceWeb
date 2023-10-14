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

const EditAddress = async (req, res) => {
  const id = req.params.id;
  const { streetAddress, district, city } = req.body;

  await User.findByIdAndUpdate(id, { streetAddress, district, city })
    .then(() => {
      res.status(200).json("Address Updated");
    })
    .catch((err) => {
      console.log(err);
      res.send(500).send("Update Failed");
    });
};

const GetAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { loginUser, signupUser, EditAddress, GetAllUsers };
