import express from 'express';
import { 
    login ,
    logout,
} from '../controllers/authControllers.js';
import { 
    updateAdminUser,
    updatePasswordUser,
} from '../controllers/authControllers.js';

const router = express.Router();

router.post('/login',login);

router.get('/logout', logout);

router.patch('/password/:email', updatePasswordUser);

router.patch('/:email', updateAdminUser);

export default router;