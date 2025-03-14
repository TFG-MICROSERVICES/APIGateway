import { generateError } from '../utils/generateError.js';
import dotenv from 'dotenv';

dotenv.config();

const { API_GATEWAY_KEY, USER_API } = process.env;

export const getUserService = async (id) => {
    try {
        const response = await fetch(`${USER_API}/user/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const user = await response.json();

        if (response.status !== 200) generateError(user.message, response.status);

        return user;
    } catch (error) {
        throw error;
    }
};
