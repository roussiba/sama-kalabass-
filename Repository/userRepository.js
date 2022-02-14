const User = require('../model/user');
const { cryptPassword } = require('../service/user/password');

let UserRepository = {
    model : User,
    create_model : async(data_model) => {
        return await User.create({
            login :   data_model.login,
            password: await cryptPassword(data_model.password)
        });
    }
};

module.exports = UserRepository ;