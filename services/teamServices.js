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

export const getTeamsService = async (search, sport_id) => {
    try {
        let query = '';

        if (search && sport_id) {
            query = `?search=${search}&sport_id=${sport_id}`;
        } else if (search) {
            query = `?search=${search}`;
        } else if (sport_id) {
            query = `?sport_id=${sport_id}`;
        }
        const response = await fetch(`${TEAM_API}/team/${query}`, {
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

export const getTeamByUserIdService = async (user_email, sportId) => {
    try {
        const response = await fetch(`${TEAM_API}/team/user/${user_email}${sportId ? `?sport_id=${sportId}` : ''}`, {
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

export const getTeamsByArrayService = async (teams) => {
    try {
        const response = await fetch(`${TEAM_API}/team/teams-by-array`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(teams),
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
