const { loginValidation, registerValidation } = require('../service/user/validation');
const User = require('../model/user');
const { cryptPassword, validPass } = require('../service/user/password');

const register = async (req, res) => {
    try {
        const { error } = registerValidation(req.body);
        if(error)
            res.status(400).send(error.details);

        const emailExist = await findOne({ email: req.body.email });

        //Check if the user is already in the database
        if(emailExist)
            return res.status(400).send('Email already exist');
        
        //Hash password
        const passwordHash = await cryptPassword(req.body.password);

        //Create a new user
        res.send(
            await new User({
                name : req.body.name,
                email : req.body.email,
                password : passwordHash
            }).save()
        );
    } catch (error) {
        res.status(400).send(error);
    }
};

const login = async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if(error) 
            return res.status(400).send(error.details);

        const user = await findOne({ email: req.body.email });
        if(!user)
            return res.status(400).send("Email is not found");

        const getValidPass = await validPass(req.body.password, user.password);
        if(!getValidPass)
            return res.status(400).send("Password invalid !");

        res.send("Logged in !");

    } catch (error) {
        res.status(400).send(error);
    }

};

module.exports = {register, login};
  