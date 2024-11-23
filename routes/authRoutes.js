import express from 'express';
import { 
    getAuthUser,
    login ,
    logout,
    registerAuth
} from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', registerAuth);

router.post('/login',login);

router.get('/logout',logout);

export default router;