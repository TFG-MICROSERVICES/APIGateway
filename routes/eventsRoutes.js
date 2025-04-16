import express from 'express';
import { getAuthUser } from '../middlewares/getAuthUser.js';
import { createEventController, getEventController, getEventsController } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAuthUser, getEventsController);

router.get('/:event_id', getAuthUser, getEventController);

router.post('/', getAuthUser, createEventController);

export default router;
