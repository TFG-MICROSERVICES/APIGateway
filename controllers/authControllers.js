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

        const cookies = setCookie.parse(response.headers.raw()['set-cookie'], { map: true });
        const refreshToken = cookies.refreshToken.value;

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
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
            message: 'User updated successfully',
            user,
        });
    }catch(error){
        next(error);
    }
}

export async function deleteAuth(req, res, next){
    try{
        const response = await fetch(`${API_AUTH}/auth/delete`, {
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
            message: "Logout successful",
        });
    } catch (error) {
        next(error);
    }
}

// export async function getAuthUser(req, res, next){
//     try{
//         const { email } = req.params;

//         if(!email) generateError('Email is required', 400);

//         const response = await fetch(`${API_AUTH}/auth/user/${email}`, {
//             headers: { 
//                 'Content-Type': 'application/json',
//                 'x-api-key': API_GATEWAY_KEY,
//                 'Authorization': `Bearer ${req.cookies.accessToken}`
//             },
//         });

//         const user = await response.json();

//         if (response.status !== 200) generateError(user.message, response.status);

//         res.status(200).json({
//             user: user,
//         });
//     }catch(error){
//         next(error);
//     }
// }