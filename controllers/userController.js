import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';
import { deleteAuth } from '../utils/deleteAuth.js';

dotenv.config();

const { API_GATEWAY_KEY, API_USER } = process.env;


export async function registerUser(req, res, next){
    const { user } = req.user;
    const data = req.body;
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