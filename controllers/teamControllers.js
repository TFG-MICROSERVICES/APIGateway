import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';
import { getTeamsService, getTeamByIdService, addUserToTeamService, createTeamService } from '../services/teamServices.js';
import { getSportsByIDService } from '../services/sportServices.js';
dotenv.config();

const { API_GATEWAY_KEY, TEAM_API } = process.env;

export const registerTeam = async (req, res, next) => {
    try {
        await createTeamService(req.body);

        res.status(201).json({
            status: 201,
            message: 'Deporte creado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export const addUserToTeam = async (req, res, next) => {
    try {
        await addUserToTeamService(req.body);

        res.status(200).json({
            status: 200,
            message: 'Usuario agregado al equipo correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export const getTeams = async (req, res, next) => {
    try {
        const { search } = req.query;

        //Obtenemos los equipos
        const {
            data: { teams },
        } = await getTeamsService(search);

        //Obtenemos los deportes de cada uno de los equipos
        const teamsWithSport = await Promise.all(
            teams.map(async (team) => {
                const { sport } = await getSportsByIDService(team.sport_id);
                team.sport = sport;
                return team;
            })
        );

        res.status(200).json({
            status: 200,
            teams: teamsWithSport,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getTeamById = async (req, res, next) => {
    try {
        const { team_id } = req.params;

        const { team } = await getTeamByIdService(team_id);

        const { sport } = await getSportsByIDService(team.sport_id);
        team.sport = sport;

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
