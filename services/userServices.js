import { generateError } from '../utils/generateError.js';
import dotenv from 'dotenv';

dotenv.config();

const { API_GATEWAY_KEY, USER_API } = process.env;

export const registerUserService = async (data) => {
    try {
        const response = await fetch(`${USER_API}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(data),
        });

        const newUser = await response.json();

        return newUser;
    } catch (error) {
        throw error;
    }
};

export const getUserService = async (email) => {
    try {
        const response = await fetch(`${USER_API}/user/email/${email}`, {
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

export const deleteUserService = async (email) => {
    try {
        const response = await fetch(`${USER_API}/user/${email}`, {
            method: 'DELETE',
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
