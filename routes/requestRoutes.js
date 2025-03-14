import express from 'express';
import { updateRequestToJoinTeam, requestToJoinTeam } from '../controllers/requestTeamControllers.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';

const router = express.Router();

router.post('/', getAuthUser, requestToJoinTeam);

router.put('/:id', getAuthUser, updateRequestToJoinTeam);

export default router;
