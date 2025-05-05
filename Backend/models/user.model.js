const mongoose = require('mongoose');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
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
        minLength: [5, 'Email Length should be greater than 5'],
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
}, { timestamps: true });

userSchema.methods.generateAuthToken = async function () {
    const token = jsonwebtoken.sign({ _id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;