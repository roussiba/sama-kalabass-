const Joi = require('joi');


//#region Register validation

const registerValidation = (data) => {
    const schemaRegister =  Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    return schemaRegister.validate(data);
}

//#endregion

//#region Login validation

const loginValidation = (data) => {
    const schemaLogin = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    return schemaLogin.validate(data);
}

//#endregion

module.exports = { registerValidation, loginValidation };