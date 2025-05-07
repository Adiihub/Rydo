const UserModel = require("../models/user.model.js");
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service");
const blacklistTokenModel = require("../models/blacklistToken.Model.js");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserAlreadyExists = await UserModel.findOne({ email });
  if (isUserAlreadyExists) {
    return res.status(409).json({ message: "User already" });
  }

  const hashPassword = await UserModel.hashPassword(password);
  const user = await createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
  });

  const token = await user.generateAuthToken();
  res.status(201).json({ token, user });
};

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = await user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

const getUserProfile = async (req, res, next) => {
  return res.status(200).json(req.user);
};

const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  const blacklistedToken = new blacklistTokenModel({ token });
  await blacklistedToken.save();

  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
};
