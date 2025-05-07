const CaptainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model.js");

const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;
  const { color, plate, capacity, vehicleType } = vehicle;

  const isCaptainAlreadyExists = await CaptainModel.findOne({ email });
  if (isCaptainAlreadyExists) {
    return res.status(409).json({ message: "Captain already exists" });
  }

  const hashPassword = await CaptainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password: hashPassword,
    vehicle,
    color,
    plate,
    capacity,
    vehicleType,
  });

  if (!captain) {
    return res.status(500).json({ message: "Error creating captain" });
  }

  const token = await captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await CaptainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordMatch = await captain.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = await captain.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, captain });
};

const getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

const logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blacklistTokenModel.create({ token });

  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
};
