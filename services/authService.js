import fetch from 'node-fetch';
import { generateError } from '../utils/generateError.js';
import dotenv from 'dotenv';

const { API_GATEWAY_KEY, AUTH_API } = process.env;

export async function registerAuthUser(req, res, next) {
    const { email, password } = req.body;
    console.log(email, password);
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
