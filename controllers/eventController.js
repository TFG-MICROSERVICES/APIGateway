import { createEventService, getEventService, getEventsService, updateEventService } from '../services/eventService.js';

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
        const events = await getEventsService();

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

        const event = await getEventService(event_id);

        res.status(200).json({
            status: 200,
            message: 'Evento encontrado correctamente',
            data: event.data,
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
            message: 'Evento actualizaod correctamente',
        });
    } catch (error) {
        next(error);
    }
};
