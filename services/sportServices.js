import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';

dotenv.config();

const { API_GATEWAY_KEY, SPORT_API } = process.env;

export const getSportsService = async (search) => {
    try {
        let params = '';
        if (search) {
            params = new URLSearchParams({ search }).toString();
        }
        const response = await fetch(`${SPORT_API}/sport${params.length > 0 ? '?' + params : ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const sports = await response.json();

        if (response.status !== 200) generateError(sports.message, sports.status);

        return sports;
    } catch (error) {
        throw error;
    }
};

export const getSportsByIDService = async (id) => {
    try {
        const response = await fetch(`${SPORT_API}/sport/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const sport = await response.json();

        if (response.status !== 200) generateError(sport.message, sport.status);

        return sport;
    } catch (error) {
        throw error;
    }
};
