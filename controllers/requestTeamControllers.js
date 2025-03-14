import { updateRequestToJoinTeamService, requestToJoinTeamService } from '../services/teamServices.js';

export const requestToJoinTeam = async (req, res, next) => {
    try {
        await requestToJoinTeamService(req.body);

        res.status(201).json({
            status: 201,
            message: 'Solicitud de unión al equipo enviada correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export const updateRequestToJoinTeam = async (req, res, next) => {
    try {
        const { id } = req.params;
        await updateRequestToJoinTeamService(id, req.body);

        res.status(200).json({
            status: 200,
            message: 'Solicitud actualizada correctamente',
        });
    } catch (error) {
        next(error);
    }
};
