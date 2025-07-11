import { generateError } from '../utils/generateError.js';
import dotenv from 'dotenv';
import { getTeamByUserIdService } from './teamServices.js';

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
        const response = await fetch(`${USER_API}/user/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify({ email }),
        });

        if (response.status !== 200 && response.status !== 404) {
            const error = await response.json();
            generateError(error.response, error.status);
        }

        const user = await response.json();

        return user;
    } catch (error) {
        throw error;
    }
};

export const getUsersByArray = async (users) => {
    try{
        const response = await fetch(`${USER_API}/user/byArray`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify({ data: users })
        });

        const data = await response.json();

        if(data.status !== 200){
            generateError(data.message, data.status);
        }

        return data;
    }catch(error){
        throw error;
    }
}

export const updateUserService = async (user_id, body) => {
    try{
        const response = await fetch(`${USER_API}/user/${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        console.log(data);

        if (data.status !== 200){
            generateError(data.message, data.status);
        }

        return data;
    }catch(error){
        throw error;
    }
}

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
