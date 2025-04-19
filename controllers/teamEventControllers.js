import { createTeamEventService, getTeamsEventByIdService } from '../services/teamEventService.js';

export const createTeamEventController = async (req, res, next) => {
    try {
        const data = await createTeamEventService(req.body);

        res.status(201).json({
            status: 201,
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export const getTeamsEventByIdController = async (req, res, next) => {
    try {
        const { event_id } = req.params;

        const { data } = await getTeamsEventByIdService(event_id);

        res.status(200).json({
            status: 200,
            message: 'Equipos del evento encontrado correctamente',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTeamEventByIdController = async (req, res, next) => {
    try {
        const { event_id } = req.params;

        const data = await getTeamsEventByIdService(event_id);

        res.status(200).json({
            status: 200,
            data: data,
        });
    } catch (error) {
        next(error);
    }
};
