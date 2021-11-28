import { object, string } from 'joi';


//#region Register validation

const registerValidation = (data) => {
    const schemaRegister =  object({
        name: string()
            .min(6)
            .required(),
        email: string()
            .min(6)
            .required()
            .email(),
        password: string()
            .min(6)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    return schemaRegister.validate(data);
}

//#endregion

//#region Login validation

const loginValidation = (data) => {
    const schemaLogin =  object({
        email: string()
            .min(6)
            .required()
            .email(),
        password: string()
            .min(6)
            .required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });
    return schemaLogin.validate(data);
}

//#endregion

export { registerValidation, loginValidation };