import fetch from 'node-fetch';
import { generateError } from '../utils/generateError.js';

const { API_GATEWAY_KEY, AUTH_API } = process.env;

export async function registerAuthUser(req, res, next) {
    const { email, password } = req.body;
    try {
        const response = await fetch(`${AUTH_API}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        const user = await response.json();

        if (response.status !== 201) generateError(user.message, response.status);

        res.status(201).json({
            status: 201,
            user,
        });
    } catch (error) {
        next(error);
    }
}

export const updateEmailService = async(email, body, token) => {
    try{
        const response = await fetch(`${AUTH_API}/auth/email/${email}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
                Authorization: token,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.status !== 200){
            generateError(data.message, data.status);
        }

        return data;
    }catch(error){
        throw error;
    }
}

export const updatePasswordService = async (email, body, token) => {
    try{
        const response = await fetch(`${AUTH_API}/auth/password/${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
                Authorization: token,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (data.status !== 200){
            generateError(data.message, data.status);
        }

        return data;
    }catch(error){
        throw error;
    }
}
