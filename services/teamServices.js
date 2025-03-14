import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';

dotenv.config();

const { API_GATEWAY_KEY, TEAM_API } = process.env;

export const createTeamService = async (data) => {
    try {
        const response = await fetch(`${TEAM_API}/team/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(data),
        });

        const newTeam = await response.json();

        if (response.status !== 201) generateError(newTeam.message, newTeam.status);

        return true;
    } catch (error) {
        throw error;
    }
};

export const getTeamsService = async (search) => {
    try {
        let params = '';
        if (search) {
            params = new URLSearchParams({ search }).toString();
        }
        const response = await fetch(`${TEAM_API}/team/${params.length > 0 ? '?' + params : ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const teams = await response.json();

        if (response.status !== 200) generateError(teams.message, teams.status);

        return teams;
    } catch (error) {
        throw error;
    }
};

export const getTeamByIdService = async (id) => {
    try {
        const response = await fetch(`${TEAM_API}/team/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const team = await response.json();

        if (response.status !== 200) generateError(team.message, team.status);

        return team;
    } catch (error) {
        throw error;
    }
};

export const addUserToTeamService = async (data) => {
    try {
        const response = await fetch(`${TEAM_API}/team/user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(data),
        });

        const team = await response.json();

        if (response.status !== 200) generateError(team.message, team.status);

        return true;
    } catch (error) {
        throw error;
    }
};

export const requestToJoinTeamService = async (data) => {
    try {
        const response = await fetch(`${TEAM_API}/team/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(data),
        });

        const team = await response.json();

        if (response.status !== 200) generateError(team.message, team.status);

        return true;
    } catch (error) {
        throw error;
    }
};

export const getRequestsByTeamIDService = async (id) => {
    try {
        const response = await fetch(`${TEAM_API}/team/request/team/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const requests = await response.json();

        if (response.status !== 200) generateError(requests.message, requests.status);

        return requests;
    } catch (error) {
        throw error;
    }
};

export const updateRequestToJoinTeamService = async (id, data) => {
    try {
        console.log(id, data);
        const response = await fetch(`${TEAM_API}/team/request/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(data),
        });

        const team = await response.json();

        if (response.status !== 200) generateError(team.message, team.status);

        return true;
    } catch (error) {
        throw error;
    }
};
