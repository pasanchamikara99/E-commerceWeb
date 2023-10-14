const mongooes = require("mongoose");
const validator = require("validator");

const Schema = mongooes.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: false,
  },
  district: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cardNo: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (
  firstname,
  userType,
  email,
  password
) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not Strong enought");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const user = await this.create({
    firstname,
    userType,
    password,
    email,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("email or password is not valid");
  }

  if (password != user.password) {
    throw Error("email or password is not valid");
  }
  return user;
};

module.exports = mongooes.model("User", userSchema);
