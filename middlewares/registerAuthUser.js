import fetch from 'node-fetch';
import { generateError } from '../utils/generateError.js';
import dotenv from 'dotenv';

const { API_GATEWAY_KEY, API_AUTH_LOCAL } = process.env;

export async function registerAuthUser(req, res, next){
    const { email, password } = req.body;
    try{
        const response = await fetch(`${API_AUTH_LOCAL}/auth/register`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        const user = await response.json();

        if (response.status !== 201) generateError(user.message, response.status);

        req.user = user;
        next();
    }catch(error){
        res.status(error.status || 500).json({
            message: error.message,
        });
    }
}