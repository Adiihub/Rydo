const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname : {
            type: String,
            required: true,
            minlength: [3, 'first Length should be greater than 3'],
        },
        lastname : {
            type: String,
            minlength: [3, 'Last Length should be greater than 3'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color Length should be greater than 3'],
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate Length should be greater than 3'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity should be greater than 0'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        },
    },
    location: {
        lat:{
            type: Number,
        },
        lng:{
            type: Number,
        },
    },
}, { timestamps: true });

captainSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const CaptainModel = mongoose.model('Captain', captainSchema);
module.exports = CaptainModel;