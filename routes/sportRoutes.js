import express from 'express';
import {
    registerSport,
    getSports,
    getSportsByID,
    updateSport,
    deleteSport
} from '../controllers/sportControllers.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const router = express.Router();

router.get('/', getAuthUser, getSports);

router.post('/', getAuthUser, isAdmin, registerSport);

router.get('/:id',getAuthUser, getSportsByID);

router.put('/:id', getAuthUser, isAdmin, updateSport);

router.delete('/:id', getAuthUser, isAdmin, deleteSport);


export default router;