import express from 'express';
import { getAuthUser } from '../middlewares/getAuthUser.js';
import {
    createEventController,
    deleteEventController,
    existsNameEvent,
    getEventController,
    getEventsController,
    updateEventController,
} from '../controllers/eventController.js';

const router = express.Router();

//GET http://localhost:3000/api/event/
router.get('/', getAuthUser, getEventsController);

//GET http://localhost:3000/api/event/:event_id
router.get('/:event_id', getAuthUser, getEventController);

//POST http://localhost:3000/api/event/
router.post('/', getAuthUser, createEventController);

//POST http://localhost:3000/api/event/exists
router.post('/exists', getAuthUser, existsNameEvent);

//PUT http://localhost:3000/api/event/:event_id
router.put('/:event_id', getAuthUser, updateEventController);

//DELETE http://localhost:3000/api/event/:event_id
router.delete('/:event_id', getAuthUser, deleteEventController);

export default router;
