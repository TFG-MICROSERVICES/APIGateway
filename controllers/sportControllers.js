import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';

dotenv.config();

const { API_GATEWAY_KEY, SPORT_API } = process.env;

export const registerSport = async (req, res, next) => {
    const data = req.body;

    try {
        const response = await fetch(`${SPORT_API}/sport/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(data),
        });

        const newSport = await response.json();

        if (response.status !== 201) generateError(newSport.message, newSport.status);

        res.status(201).json({
            status: 201,
            message: 'Sport created successfully',
            newSport,
        });
    } catch (error) {
        next(error);
    }
};

export const getSports = async (req, res, next) => {
    try {
        const { search } = req.query;
        let params = '';
        if (search) {
            params = new URLSearchParams({ search }).toString();
        }
        const response = await fetch(`${SPORT_API}/sport${params ? '?' + params : ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const sports = await response.json();

        console.log(sports);

        if (response.status !== 200) generateError(sports.message, sports.status);

        res.status(200).json({
            status: 200,
            sports,
        });
    } catch (error) {
        next(error);
    }
};

export const getSportsByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = await fetch(`${SPORT_API}/sport/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const sport = await response.json();

        if (response.status !== 200) generateError(sport.message, sport.status);

        res.status(200).json({
            status: 200,
            sport,
        });
    } catch (error) {
        next(error);
    }
};

export const updateSport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const response = await fetch(`${SPORT_API}/sport/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(data),
        });

        const updateSport = await response.json();

        if (response.status !== 200) generateError(updateSport.message, updateSport.status);

        res.status(200).json({
            status: 200,
            updateSport,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await fetch(`${SPORT_API}/sport/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const deleteSport = await response.json();

        if (response.status !== 200) generateError(deleteSport.message, deleteSport.status);

        res.status(200).json({
            status: 200,
            deleteSport,
        });
    } catch (error) {
        next(error);
    }
};
