import express from 'express';
import { 
    login ,
    logout,
    registerAuth
} from '../controllers/authControllers.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';

const router = express.Router();

router.post('/register', registerAuth);

router.post('/login',login);

router.get('/logout', logout);

export default router;