import express from 'express';
import { registerSport, getSports, getSportsByID, updateSport, deleteSport } from '../controllers/sportControllers.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

//GET http://localhost:3000/api/sports
router.get('/', getAuthUser, getSports);

//POST http://localhost:3000/api/sports
router.post('/', getAuthUser, isAdmin, registerSport);

//GET http://localhost:3000/api/sports/:id
router.get('/:id', getAuthUser, getSportsByID);

//PUT http://localhost:3000/api/sports/:id
router.put('/:id', getAuthUser, isAdmin, updateSport);

//DELETE http://localhost:3000/api/sports/:id
router.delete('/:id', getAuthUser, isAdmin, deleteSport);

export default router;
