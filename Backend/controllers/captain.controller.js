const CaptainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

const registerCaptain = async (req, res) => {
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

module.exports = {
  registerCaptain,
};
