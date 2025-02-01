import fetch from 'node-fetch';
import setCookie from 'set-cookie-parser';
import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';

dotenv.config();

const { API_GATEWAY_KEY, AUTH_API } = process.env;

export async function login(req, res, next){
    const { email, password } = req.body;
    try {
        const response = await fetch(`${AUTH_API}/auth/login`, {
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

        // Obtener las cookies de la respuesta
        const cookies = setCookie.parse(response.headers.get('set-cookie'));
        const refreshToken = cookies.find(cookie => cookie.name === 'refreshToken');

        // Si existe el refreshToken, establecerlo en las cookies del cliente
        if (refreshToken) {
            res.cookie('refreshToken', refreshToken.value, {
                maxAge: refreshToken.maxAge * 1000,
                httpOnly: true,
                secure: false,
                sameSite: 'lax'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Login successful',
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const loginGoogle = async (req, res, next) => {
    try{
        const response = await fetch(`${AUTH_API}/auth/google`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY
            },
        });

        const data = await response.json();

        res.redirect(data.redirectUri);
    }catch(error){
        next(error);
    }
};

export const loginGoogleCallback = async (req, res, next) => {
    const { code } = req.query;

    try{
        if(!code) generateError('Error: No authorization code received', 400);
        const response = await fetch(`${AUTH_API}/auth/google/callback?code=${code}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY
            },
        });

        const data = await response.json();

        res.status(200).json({
            status: 200,
            data,
        });
    }catch(error){
        next(error);
    }
};
    

export async function updatePasswordUser(req, res, next){
    const { email } = req.params;
    const { password } = req.body;
    const token = req.headers.authorization;
    try{
        const response = await fetch(`${AUTH_API}/auth/password/${email}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({password}),
        });

        const user = await response.json();

        console.log(user);

        if (response.status !== 200) generateError(user.message, response.status);

        res.status(200).json({
            status: 200,
            message: 'Password updated successfully',
            user,
        });
    }catch(error){
        next(error);
    }
}

export async function updateAdminUser(req, res, next){
    const { email } = req.params;
    const { isAdmin } = req.body;
    const token = req.headers.authorization;
    try{
        const response = await fetch(`${AUTH_API}/auth/${email}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ isAdmin }),
        });

        const user = await response.json();

        if (response.status !== 200) generateError(user.message, response.status);

        res.status(200).json({
            status: 200,
            message: 'User updated successfully',
            user,
        });
    }catch(error){
        next(error);
    }
}

export async function deleteAuth(req, res, next){
    try{
        const response = await fetch(`${AUTH_API}/auth/delete`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
                'Authorization': `Bearer ${req.cookies.accessToken}`
            },
        });

        const user = await response.json();

        if (response.status !== 200) generateError(user.message, response.status);

        res.status(200).json({
            status: 200,
            message: 'User deleted successfully',
            user
        });
    }catch(error){
        next(error);
    }
}

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
            status: 200,
            message: "Logout successful",
        });
    } catch (error) {
        next(error);
    }
}

export const checkAuth = async (req, res, next) => {
    try{
        const token = req.headers.authorization;

        let resfreshToken = "";
        const oldCookie = req.cookies?.refreshToken;

        if(oldCookie && oldCookie !== "undefined"){
            resfreshToken = oldCookie;
        }

        const response = await fetch(`${AUTH_API}/auth/check`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "x-api-key": API_GATEWAY_KEY,
                Authorization: token,
            },
            body: JSON.stringify({ refreshToken: resfreshToken }),
        });

        if(response.status !== 200) generateError('Unauthorized', 401);

        const user = await response.json();

        const cookies = setCookie.parse(response.headers.get('set-cookie'));
        const refreshToken = cookies.find(cookie => cookie.name === 'refreshToken');

        if (refreshToken) {
            res.cookie('refreshToken', refreshToken.value, {
                maxAge: refreshToken.maxAge * 1000,
                httpOnly: true,
                secure: false,
                sameSite: 'lax'
            });
        }
        
        res.status(200).json({
            status: 200,
            message: 'User authenticated',
            user,
        });
    }catch(error){
        console.log(error);
        next(error);
    }
}