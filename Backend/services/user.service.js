const UserModel = require('../models/user.model');




module.exports = {
    createUser: async ({firstname, lastname, email, password}) => {
        if(!email || !password || !firstname) {
            throw new Error('Missing required fields');
        }
        const user = new UserModel({
            email,
            password,
            fullname: {
                firstname,
                lastname
            }
        });
        return user.save();
    }
}