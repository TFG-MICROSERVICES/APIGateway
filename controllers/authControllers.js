import fetch from 'node-fetch';
import setCookie from 'set-cookie-parser';
import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';

dotenv.config();

const { API_GATEWAY_KEY, API_AUTH, API_AUTH_LOCAL } = process.env;

export async function registerAuth(req, res, next){
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

        res.status(201).json({
            message: 'User created successfully',
            user: user,
        });
    }catch(error){
        res.status(error.status || 500).json({
            message: error.message,
        });
    }
}

export async function login(req, res, next){
    const { email, password } = req.body;
    try {
        const response = await fetch(`${API_AUTH_LOCAL}/auth/login`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-api-key': API_GATEWAY_KEY
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
        });
    
        const user = await response.json();
    
        if (response.status !== 200) generateError(user.message, response.status);

        console.log('user', user);

        const cookies = setCookie.parse(response.headers.raw()['set-cookie'], { map: true });
        const refreshToken = cookies.refreshToken.value;

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
    
        res.status(200).json({
            message: 'Login successful',
            user,
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message,
        });
    }
};

export async function logout(req, res, next) {
    try {
        res.cookie("refreshToken", "", {
            maxAge: 0,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            expires: new Date(0),
        });

        res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        next(error);
    }
}

export async function getAuthUser(req, res, next){
    try{
        const { email } = req.params;

        if(!email) generateError('Email is required', 400);

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