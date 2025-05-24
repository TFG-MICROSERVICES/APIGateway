import express from 'express';
import {
    registerTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
    addUserToTeam,
    getTeamByUserController,
    getAllTeamsByUserController,
} from '../controllers/teamControllers.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';

const router = express.Router();

//GET http://localhost:3000/team/
router.get('/', getAuthUser, getTeams);

//GET http://localhost:3000/team/:team_id
router.get('/:team_id', getAuthUser, getTeamById);

router.get('/user/all/:user_email', getAuthUser, getAllTeamsByUserController);

router.get('/user/:user_email', getAuthUser, getTeamByUserController);

//POST http://localhost:3000/team/register
router.post('/register', getAuthUser, registerTeam);

//POST http://localhost:3000/team/user
router.post('/user', getAuthUser, addUserToTeam);

//PUT http://localhost:3000/team/:team_id
router.put('/:team_id', getAuthUser, updateTeam);

//DELETE http://localhost:3000/team/:team_id
router.delete('/:team_id', getAuthUser, deleteTeam);

export default router;
