import {
    checkExistsNameEvent,
    createEventService,
    deleteEventService,
    getEventService,
    getEventsService,
    updateEventService,
} from '../services/eventService.js';
import { getTeamsByArrayService } from '../services/teamServices.js';
import { getUsersByArray, getUserService } from '../services/userServices.js';

export const createEventController = async (req, res, next) => {
    try {
        const { data } = req.body;

        await createEventService(data);

        res.status(201).json({
            status: 200,
            message: 'Evento creado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export const getEventsController = async (req, res, next) => {
    try {
        const { sport_id } = req.query;

        const events = await getEventsService(sport_id);

        res.status(200).json({
            status: 200,
            message: 'Eventos encontrados correctamente',
            data: events.data,
        });
    } catch (error) {
        next(error);
    }
};

export const getEventController = async (req, res, next) => {
    try {
        const { event_id } = req.params;

        //Obtenemos toda la información del evento
        const event = await getEventService(event_id);

        //Obtenemos la información de los equipos que estan relacionado con el evento
        const teams = await getTeamsByArrayService({ data: event.data.teams });

        //Actualiza la información de los equipos del evento con toda su información
        event.data.teams = teams.data;

        // Para cada equipo, si tiene user_teams, obtenemos la info de los usuarios
        await Promise.all(
            event.data.teams.map(async (team) => {
                if (team?.user_teams && team.user_teams.length > 0) {
                    console.log(team?.user_teams);
                    const user_teams = await getUsersByArray(
                        team.user_teams.map((user) => ({ user_email: user.user_email }))
                    );
                    team.user_teams = user_teams.data;
                }
            })
        );

        res.status(200).json({
            status: 200,
            message: 'Evento encontrado correctamente',
            data: event.data,
        });
    } catch (error) {
        next(error);
    }
};

export const existsNameEvent = async (req, res, next) => {
    try {
        const { event } = req.body;

        const { data } = await checkExistsNameEvent({ event: event });

        res.status(200).json({
            status: 200,
            message: data ? 'Ya existe un evento con este nombre' : 'No existe ningun evento con este nombre',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export const updateEventController = async (req, res, next) => {
    try {
        const { event_id } = req.params;
        const { data } = req.body;

        await updateEventService(event_id, data);

        res.status(200).json({
            status: 200,
            message: 'Evento actualizado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export const deleteEventController = async (req, res, next) => {
    try {
        const { event_id } = req.params;

        await deleteEventService(event_id);

        res.status(200).json({
            status: 200,
            message: 'Evento eliminado correctamente',
        });
    } catch (error) {
        next(error);
    }
};
