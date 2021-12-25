import { UnauthenticatedError } from '../errors';
import { isTokenValid } from '../utils';


const authentificateUser = async (req, res, next) =>{
    const token = req.signedCookies.token;

    if (!token) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

    try {
        const { name, userId, role } = isTokenValid({ token });
        req.user = { name, userId, role };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid');
    }
}