import { generateError } from '../utils/generateError.js';

export const verifyEmailMatch = (req, res, next) => {
    try {
        const { email, admin } = req.user;
        const { email: emailMatch } = req.params;

        if (email !== emailMatch && !admin) generateError('You dont have allow actions with this email', 403);

        next();
    } catch (error) {
        next(error);
    }
};
