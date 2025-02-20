import fetch from 'node-fetch';
import { generateError } from '../utils/generateError.js';
import dotenv from 'dotenv';

const { API_GATEWAY_KEY, AUTH_API } = process.env;

export async function deleteAuthUser(req, res, next) {
    const { email } = req.params;
    const token = req.headers.authorization;
    try {
        const response = await fetch(`${AUTH_API}/auth/${email}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
                Authorization: `Bearer ${token}`,
            },
        });

        const user = await response.json();

        if (response.status !== 200) generateError(user.message, response.status);

        next();
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message,
        });
    }
}
