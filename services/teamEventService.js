import fetch from 'node-fetch';
import { generateError } from '../utils/generateError.js';

const { API_GATEWAY_KEY, EVENT_API } = process.env;

export const createTeamEventService = async (body) => {
    try {
        const response = await fetch(`${EVENT_API}/team-event`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (data.status !== 201) {
            generateError(data.message, data.status);
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const getTeamsEventByIdService = async (event_id) => {
    try {
        const response = await fetch(`${EVENT_API}/team-event`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const data = await response.json();

        if (data.status !== 200) {
            generateError(data.message, data.status);
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteTeamEventByIdService = async (event_id) => {
    try {
        const response = await fetch(`${EVENT_API}/team-event/event/${event_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const data = await response.json();

        if (data.status !== 200) {
            generateError(data.message, data.status);
        }

        return data;
    } catch (error) {
        throw error;
    }
};
