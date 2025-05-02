import express from 'express';
import { getAuthUser } from '../middlewares/getAuthUser.js';
import { createResultsController, updateResultController } from '../controllers/resultControllers.js';

const router = express.Router();

//POST http://localhost:3000/api/result/:event_id
router.post('/:event_id', getAuthUser, createResultsController);

//PUT http://localhost:3000/api/result/:result_id
router.put('/:result_id', getAuthUser, updateResultController);

export default router;