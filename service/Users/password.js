import { genSalt, hash, compare } from 'bcryptjs';

const cryptPassword = async (password) => {
    const salt = await genSalt(10)
    return await hash(password, salt);
}

const validPass = async (password, data) => {
    return await compare(password, data);
}

export {  cryptPassword, validPass };