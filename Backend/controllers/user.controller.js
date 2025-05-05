const UserModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const { createUser } = require("../services/user.service");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hashPassword = await UserModel.hashPassword(password);
  const user = await createUser({
    firstname : fullname.firstname,
    lastname : fullname.lastname,
    email,
    password: hashPassword,
  });

  const token = await user.generateAuthToken();
  res.status(201).json({ token, user });
};

module.exports = {
  registerUser,
};
