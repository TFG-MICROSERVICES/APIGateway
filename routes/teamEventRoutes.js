import express from 'express';
import { getAuthUser } from '../middlewares/getAuthUser.js';
import { createTeamEventController } from '../controllers/teamEventControllers.js';

const router = express.Router();

//POST http://localhost:3000/api/team-event/
router.post('/', getAuthUser, createTeamEventController);

export default router;
