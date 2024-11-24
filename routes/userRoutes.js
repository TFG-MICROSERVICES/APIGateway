import express from 'express';
import {
    registerUser,
} from '../controllers/userController.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';
import { registerAuthUser } from '../middlewares/registerAuthUser.js';

const router = express.Router();

router.post('/register', registerAuthUser, registerUser);

export default router;
