import dotenv from 'dotenv';
import { generateError } from '../utils/generateError.js';
import { getTeamsService, getTeamByIdService, addUserToTeamService, createTeamService } from '../services/teamServices.js';
import { getUserService } from '../services/userServices.js';
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

        res.status(201).json({
            status: 201,
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

        //Añadir obtener los datos de los usuarios que pertenecen al equipo
        const teamsWithUsers = await Promise.all(
            teamsWithSport.map(async (team) => {
                const usersPromises = team.user_teams.map(async (userTeam) => {
                    const { user } = await getUserService(userTeam.user_id);
                    return { ...userTeam, user };
                });

                const users = await Promise.all(usersPromises);
                return { ...team, user_teams: users };
            })
        );

        //Obtenemos los datos de los usuarios que han solicitado unirse al equipo
        const teamsWithRequests = await Promise.all(
            teamsWithUsers.map(async (team) => {
                const requestPromises = team.request_teams.map(async (request) => {
                    const { user } = await getUserService(request.user_id);
                    return { ...request, user };
                });

                const requests = await Promise.all(requestPromises);
                return { ...team, request_teams: requests };
            })
        );

        res.status(200).json({
            status: 200,
            teams: teamsWithRequests,
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

        //Añadir obtener los datos de los usuarios que pertenecen al equipo
        const users = await Promise.all(
            team.user_teams.map(async (userTeam) => {
                const { user } = await getUserService(userTeam.user_id);
                return { ...userTeam, user };
            })
        );

        team.user_teams = users;

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
