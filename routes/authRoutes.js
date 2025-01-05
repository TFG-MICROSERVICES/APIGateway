import express from 'express';
import { 
    login ,
    logout,
} from '../controllers/authControllers.js';
import { 
    updateAdminUser,
    updatePasswordUser,
} from '../controllers/authControllers.js';
import { verifyEmailMatch } from '../middlewares/verifyEmailMatch.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';

const router = express.Router();

router.post('/login',login);

router.get('/logout', logout);

router.patch('/password/:email', getAuthUser, verifyEmailMatch, updatePasswordUser);

router.patch('/:email', updateAdminUser);

export default router;