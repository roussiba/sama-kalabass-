const { loginValidation, registerValidation } = require('../service/user/validation');
const { cryptPassword, validPass } = require('../service/user/password');
const { attachCookiesToResponse, createTokenUser, createJWT } = require('../utils');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const User = require('../model/user');

const register = async (req, res) => {
    try {

        const { error } = registerValidation(req.body);
        if(error)
            res.status(400).send(error.details);

        const emailExist = await User.findOne({ email: req.body.email });

        //Check if the user is already in the database
        if(emailExist)
            throw new CustomError.BadRequestError('Email already exists');
        
        //Hash password
        const passwordHash = await cryptPassword(req.body.password);

        const user = await new User({
                        name : req.body.name,
                        email : req.body.email,
                        password : passwordHash
                    }).save();

        //Create a new user
        /*res.send(user);*/

        const tokenUser = createTokenUser(user);
        const tokenJwt = createJWT({payload: tokenUser});
        //attachCookiesToResponse({ res, user: tokenUser });
        res.status(StatusCodes.CREATED).json({ user: tokenUser, token: tokenJwt });

    } catch (err) {
        res.status(400).json(err);
    }
};

const login = async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if(error) 
            return res.status(400).send(error.details);

        const user = await User.findOne({ email: req.body.email });
        if(!user)
            return res.status(400).send("Email is not found");

        const getValidPass = await validPass(req.body.password, user.password);
        if(!getValidPass)
            return res.status(400).send("Password invalid !");

        const tokenUser = createTokenUser(user);
        const tokenJwt = createJWT({payload: tokenUser});

        attachCookiesToResponse({ res, user: tokenUser, token: tokenJwt });
          
        res.status(StatusCodes.OK).json({ user: tokenUser , token: tokenJwt });

    } catch (error) {
        res.status(400).send(error);
    }

};

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {register, login};
  