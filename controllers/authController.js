const { loginValidation, registerValidation } = require('../service/user/validation');
const { validPass } = require('../service/user/password');
const { attachCookiesToResponse, createTokenUser, createJWT } = require('../utils');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const GenericRepository = require('../Repository/GenericRepository');

const register = async (req, res) => {
    try {

        const { error } = registerValidation(req.body);
        if(error)
            res.status(400).send(error.details);

        const emailExist = await GenericRepository.repository_user.model.findOne({ login: req.body.login });

        //Check if the user is already in the database
        if(emailExist)
            throw new CustomError.BadRequestError('Email already exists');

        const user   = await new GenericRepository.repository_user.create_model(req.body);
        const compte = await new GenericRepository.repository_compte.create_model(req.body);

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
            res.status(400).json(error.details);

        const user = await GenericRepository.repository_user.model.findOne({ email: req.body.email });
        if(!user)
            res.status(400).json("Email is not found");

        const getValidPass = await validPass(req.body.password, user.password);
        if(!getValidPass)
            res.status(400).json("Password invalid !");

        const tokenUser = createTokenUser(user);
        const tokenJwt = createJWT({payload: tokenUser});

        attachCookiesToResponse({ res, user: tokenUser, token: tokenJwt });
        res.status(StatusCodes.OK).json({ user: tokenUser , token: tokenJwt });

    } catch (error) {
        res.status(400).json(error);
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
  