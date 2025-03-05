import { generateError } from '../utils/generateError.js';

const { USER_API, API_GATEWAY_KEY } = process.env;

export const getUser = async (req, res, next) => {
    try {
        const user = req.user;
        const login = req.login;

        console.log('login', login);
        console.log('user', user);
        const response = await fetch(`${USER_API}/user/${user?.user?.id || user?.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const userData = await response.json();

        console.log(userData);

        if (response.status !== 200) generateError(response.status, response.message);

        let userAuth;
        if (login) {
            userAuth = {
                user: {
                    id: userData.user.id,
                    email: user.user.email,
                    admin: userData.user.admin,
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
            };
        }

        console.log(userAuth);

        if (login) {
            res.status(200).json({
                status: 200,
                message: 'Login successful',
                user,
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
