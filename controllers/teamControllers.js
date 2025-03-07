import fetch from 'node-fetch';
import setCookie from 'set-cookie-parser';
import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';

dotenv.config();

const { API_GATEWAY_KEY, TEAM_API } = process.env;

export const registerTeam = async (req, res, next) => {
    const data = req.body;

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

        res.status(201).json({
            status: 201,
            message: 'Sport created successfully',
            newTeam,
        });
    } catch (error) {
        next(error);
    }
};

export const getTeams = async (req, res, next) => {
    try {
        const { search } = req.query;
        let params = '';
        if (search) {
            params = new URLSearchParams({ search }).toString();
        }
        const response = await fetch(`${TEAM_API}/team/${params ? '?' + params : ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const teams = await response.json();

        if (response.status !== 200) generateError(teams.message, teams.status);

        res.status(200).json({
            status: 200,
            teams,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getTeamById = async (req, res, next) => {
    try {
        const { team_id } = req.params;

        const response = await fetch(`${TEAM_API}/team/${team_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const team = await response.json();

        if (response.status !== 200) generateError(team.message, team.status);

        res.status(200).json({
            status: 200,
            team,
        });
    } catch (error) {
        next(error);
    }
};

export const updateTeam = async (req, res, next) => {
    try {
        const { team_id } = req.params;
        const data = req.body;
        const response = await fetch(`${TEAM_API}/team/${team_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
            body: JSON.stringify(data),
        });

        const updateTeam = await response.json();

        if (response.status !== 200) generateError(updateTeam.message, updateTeam.status);

        res.status(200).json({
            status: 200,
            updateTeam,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTeam = async (req, res, next) => {
    try {
        const { team_id } = req.params;
        const response = await fetch(`${TEAM_API}/team/${team_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_GATEWAY_KEY,
            },
        });

        const deleteTeam = await response.json();

        if (response.status !== 200) generateError(deleteTeam.message, deleteTeam.status);

        res.status(200).json({
            status: 200,
            deleteTeam,
        });
    } catch (error) {
        next(error);
    }
};
