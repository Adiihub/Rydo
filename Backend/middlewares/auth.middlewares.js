const UserModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model.js");
const captainModel = require("../models/captain.model.js");

const authUser = async (req, res, next) => {
  let token;

  // Check if the token is present in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } 

  // Check if the token is present in the cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const blacklistedToken = await blacklistTokenModel.findOne({ token });

  if (blacklistedToken) {
    return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
  }
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded._id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

const authCaptain = async (req, res, next) => {
  let token;

  // Check if the token is present in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } 

  // Check if the token is present in the cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const blacklistedToken = await blacklistTokenModel.findOne({ token });

  if (blacklistedToken) {
    return res.status(401).json({ message: "Unauthorized: Token is blacklisted" });
  }
  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.captain = await captainModel.findById(decoded._id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = { authUser, authCaptain };
