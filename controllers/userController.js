import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';
import { deleteAuth } from './authControllers.js';

dotenv.config();

const { API_GATEWAY_KEY, API_USER, API_AUTH_LOCAL } = process.env;


export async function registerUser(req, res, next){
    const data = req.body;
    const token = req.user.token;
    try{
        const response = await fetch(`${API_USER}/user/register`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY
            },
            body: JSON.stringify(data),
        });

        const newUser = await response.json();

        if (response.status !== 201){
            console.log("Rollbacking user creation");
            const response = await fetch(`${API_AUTH_LOCAL}/auth/${req.user.user.email}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'x-api-key': API_GATEWAY_KEY,
                    'Authorization': `Bearer ${token}`
                },
            });
            generateError(newUser.message, response.status);
        }

        res.status(201).json({
            message: 'User created successfully',
            newUser
        });
    }catch(error){
        next(error);
    }
}

export async function getUsers(req, res, next){
    try{
        const response = await fetch(`${API_USER}/user`, {
            headers: {
                "Content-Type": "application/json",
                'x-api-key': API_GATEWAY_KEY
            }
        });

        const users = await response.json();

        if (response.status !== 200) generateError(users.message, response.status);

        res.status(200).json({
            users
        });
    }catch(error){
        next(error);
    }
}