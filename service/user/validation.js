const Joi = require('joi');


//#region Register validation

const registerValidation = (data) => {
    const schemaRegister =  Joi.object({
        nom: Joi.string()
            .min(6),
        prennom: Joi.string()
            .min(6),
        email: Joi.string()
            .min(6)
            .email(),
        phone: Joi.string()
            .min(6),
        login: Joi.string()
            .required(),
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
        login: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    return schemaLogin.validate(data);
}

//#endregion

module.exports = { registerValidation, loginValidation };