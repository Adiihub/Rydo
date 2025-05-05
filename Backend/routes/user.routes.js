const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model');
const { body } = require('express-validator'); 
const {registerUser, loginUser} = require('../controllers/user.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3'),
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], loginUser);


module.exports = router;
