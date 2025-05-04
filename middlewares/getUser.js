import { getTeamByUserIdService } from '../services/teamServices.js';
import { generateError } from '../utils/generateError.js';

const { USER_API, API_GATEWAY_KEY } = process.env;

export const getUser = async (req, res, next) => {
    try {
        const user = req.user;
        const login = req.login;

        const email = user?.user?.email || user?.email;
        const response = await fetch(`${USER_API}/user/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify({ email }),
        });

        const userData = await response.json();

        if (response.status !== 200) generateError(response.status, response.message);

        let userAuth;
        console.log("user",user);
        console.log("userData", userData);
        if (login) {
            userAuth = {
                user: {
                    auth_id: user.id,
                    user_id: userData.user.id,
                    email: user.user.email,
                    admin: user.user.admin,
                    name: userData.user.name,
                    lastName: userData.user.lastName,
                    image_profile: userData.user.image_profile,
                    phone_number: userData.user.phone_number,
                    birthdate: userData.user.birthdate,
                    city: userData.user.city,
                    autonomous_region: userData.user.autonomous_region,
                    main_sport_id: userData.user.main_sport_id,
                    createdAt: userData.user.createdAt,
                    updatedAt: userData.user.updatedAt,
                },
                token: user.token,
            };
        } else {
            userAuth = {
                ...userData.user,
                ...user,
                user_id: userData.user.id,
                auth_id: user.id
            };
        }

        if (login) {
            res.status(200).json({
                status: 200,
                message: 'Login successful',
                user: userAuth,
            });
        } else {
            res.status(200).json({
                status: 200,
                message: 'User authenticated',
                user: userAuth,
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
};
