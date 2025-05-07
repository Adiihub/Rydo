const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {authCaptain} = require("../middlewares/auth.middlewares.js");
const {registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain} = require('../controllers/captain.controller');


router.post('/register', [
    body('fullname.firstname').notEmpty().withMessage('First name is required').isLength({ min: 3 }).withMessage('First name should be at least 3 characters long'),
    body('fullname.lastname').notEmpty().withMessage('Last name is required').isLength({ min: 3 }).withMessage('Last name should be at least 3 characters long'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required').isLength({ min: 3 }).withMessage('Vehicle color should be at least 3 characters long'),
    body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required').isLength({ min: 3 }).withMessage('Vehicle plate should be at least 3 characters long'),
    body('vehicle.capacity').notEmpty().withMessage('Vehicle capacity is required').isNumeric().withMessage('Vehicle capacity should be a number'),
    body('vehicle.vehicleType').notEmpty().withMessage('Vehicle type is required').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),
], registerCaptain);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
], loginCaptain);

router.get('/profile', authCaptain, getCaptainProfile);
router.get('/logout', authCaptain, logoutCaptain);

module.exports = router;
