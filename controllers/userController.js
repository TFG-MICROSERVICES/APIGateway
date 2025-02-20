import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';

dotenv.config();

const { API_GATEWAY_KEY, USER_API, AUTH_API, INTERNAL_API_KEY } = process.env;

export async function registerUser(req, res, next) {
    const data = req.body;
    const token = req.headers.authorization;
    try {
        const response = await fetch(`${USER_API}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(data),
        });

        const newUser = await response.json();

        //If data response is not 201, rollback the user creation to evict inconsistency data in both services
        if (response.status !== 201) {
            const response = await fetch(`${AUTH_API}/auth/${req.user.user.email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_GATEWAY_KEY,
                    Authorization: token,
                    'x-internal-key': INTERNAL_API_KEY,
                },
            });
            const deletedUser = await response.json();
            if (response.status !== 200) generateError(deletedUser.message, deletedUser.status);
            //Inform the user that the user was not created by duplicated data or invalid data
            res.status(400).json({
                message: 'User not created by duplicated data or invalid data',
            });
        }

        //If data response is 201, return the user created
        res.status(201).json({
            status: 201,
            message: 'User created successfully',
            newUser,
        });
    } catch (error) {
        next(error);
    }
}

export async function getUsers(req, res, next) {
    try {
        const { search } = req.query;
        let params = '';
        if (search) {
            params = new URLSearchParams({ search }).toString();
        }
        const response = await fetch(`${USER_API}/user${params ? '?' + params : ''}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const users = await response.json();

        if (response.status !== 200) generateError(users.message, response.status);

        res.status(200).json({
            status: 200,
            users,
        });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    const { email } = req.params;
    try {
        const response = await fetch(`${USER_API}/user/${email}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const user = await response.json();

        if (response.status !== 200) generateError(user.message, response.status);

        res.status(200).json({
            status: 200,
            user,
        });
    } catch (error) {
        next(error);
    }
};

export async function updateUser(req, res, next) {
    const { email } = req.params;
    const data = req.body;
    const token = req.user.token;
    try {
        const response = await fetch(`${USER_API}/user/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        const user = await response.json();

        if (response.status !== 200) generateError(user.message, response.status);

        res.status(200).json({
            status: 200,
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        next(error);
    }
}

export async function updateEmailUser(req, res, next) {
    const { email } = req.params;
    const { newEmail } = req.body;
    try {
        const response = await fetch(`${USER_API}/user/email/${email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify({ newEmail }),
        });

        const user = await response.json();

        if (response.status !== 200) generateError(user.message, response.status);

        next();
    } catch (error) {
        next(error);
    }
}

export async function deleteUser(req, res, next) {
    const { email } = req.params;
    const token = req.user.token;
    try {
        const response = await fetch(`${USER_API}/user/${email}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
                Authorization: `Bearer ${token}`,
            },
        });

        const user = await response.json();

        if (response.status !== 200) generateError(user.message, response.status);

        res.status(200).json({
            status: 200,
            message: 'User deleted successfully',
            user,
        });
    } catch (error) {
        next(error);
    }
}
