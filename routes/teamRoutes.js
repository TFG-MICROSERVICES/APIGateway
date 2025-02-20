import express from 'express';
import { registerTeam, getTeams, getTeamById, updateTeam, deleteTeam } from '../controllers/teamControllers.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';

const router = express.Router();

router.get('/', getAuthUser, getTeams);

router.post('/', getAuthUser, registerTeam);

router.get('/:team_id', getAuthUser, getTeamById);

router.put('/:team_id', getAuthUser, updateTeam);

router.delete('/:team_id', getAuthUser, deleteTeam);

export default router;
