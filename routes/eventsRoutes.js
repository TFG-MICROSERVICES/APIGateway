import express from 'express';
import { getAuthUser } from '../middlewares/getAuthUser.js';
import { getEventsController } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAuthUser, getEventsController);

export default router;
