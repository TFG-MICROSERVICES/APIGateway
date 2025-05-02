import fetch from 'node-fetch';
import { generateError } from '../utils/generateError.js';

const { API_GATEWAY_KEY, EVENT_API } = process.env;

export const createResultsService = async (body, event_id) => {
    try{
        const response = await fetch(`${EVENT_API}/result/${event_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if(data.status !== 201){
            generateError(data.message, data.status);
        }

        return data;
    }catch(error){
        throw error;
    }
}

export const updateResultService = async (body, result_id) => {
    try{
        const response = await fetch(`${EVENT_API}/result/${result_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if(data.status !== 200){
            generateError(data.message, data.status);
        }

        return data;
    }catch(error){
        throw error;
    }
}