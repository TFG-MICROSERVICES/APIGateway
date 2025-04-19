import fetch from 'node-fetch';
import { generateError } from '../utils/generateError.js';

const { API_GATEWAY_KEY, EVENT_API } = process.env;

export const createEventService = async (body) => {
    try {
        const response = await fetch(`${EVENT_API}/event/register`, {
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

        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getEventsService = async (sport_id) => {
    try {
        const response = await fetch(`${EVENT_API}/event?sport_id=${sport_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'applicaction/json',
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

export const getEventService = async (event_id) => {
    try {
        const response = await fetch(`${EVENT_API}/event/${event_id}`, {
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

export const checkExistsNameEvent = async (body) => {
    try {
        const response = await fetch(`${EVENT_API}/event/exists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(body),
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

export const updateEventService = async (event_id, body) => {
    try {
        const response = await fetch(`${EVENT_API}/event/${event_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(body),
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

export const deleteEventService = async (event_id) => {
    try {
        const response = await fetch(`${EVENT_API}/event/${event_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
};
