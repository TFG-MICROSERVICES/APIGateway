import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';

dotenv.config();

const { API_GATEWAY_KEY, API_AUTH, API_AUTH_LOCAL } = process.env;


export async function login(req, res, next){
    const { email, password } = req.body;

    if(!email) generateError('Email is required', 400);

    if(!password) generateError('Password is required', 400);
    
    try {
        const response = await fetch(`${API_AUTH_LOCAL}/auth/login`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-api-key': API_GATEWAY_KEY
        },
        body: JSON.stringify({ email, password }),
        });

        console.log(response.cookie);
    
        const user = await response.json();
    
        if (response.status !== 200) generateError(user.message, response.status);
    
        res.status(200).json({
            message: 'Login successful',
            user: user,
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message,
        });
    }
};

export async function logout(req, res, next){
    try{
        // const resfreshToken = req.cookies.refreshToken;
        // console.log(resfreshToken)

        console.log(req);

        res.cookie("refreshToken", "",{
            maxAge: 0,
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: new Date(0),
        });

        res.status(200).json({
            message: "Logout successful",
        });
    }catch(error){
        next(error);
    }
}

export async function getAuthUser(req, res, next){
    try{
        
        const { email } = req.params;

        const response = await fetch(`${API_AUTH}/auth/user/${email}`, {
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
                'Authorization': `Bearer ${req.cookies.accessToken}`
            },
        });

        const user = await response.json();

        if (response.status !== 200) generateError(user.message, response.status);

        res.status(200).json({
            user: user,
        });
    }catch(error){
        next(error);
    }
}

export async function register(req, res, next){
    try{
        const { email, password } = req.body;

        if(!email) generateError('Email is required', 400);

        if(!password) generateError('Password is required', 400);

        const response = await fetch(`${API_AUTH}/auth/register`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY
            },
            body: JSON.stringify({ email, password, firstName, lastName }),
        });

        const user = await response.json();

        console.log(user);

        if (response.status !== 201) generateError(user.message, response.status);

        res.status(201).json({
            message: 'User created successfully',
            user: user,
        });
    }catch(error){
        next(error);
    }
}