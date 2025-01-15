import express from 'express';
import { 
    login ,
    logout,
    loginGoogle,
    loginGoogleCallback,
} from '../controllers/authControllers.js';
import { 
    updateAdminUser,
    updatePasswordUser,
} from '../controllers/authControllers.js';
import { verifyEmailMatch } from '../middlewares/verifyEmailMatch.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';

const router = express.Router();

router.post('/login',login);

router.get('/google', loginGoogle);

router.get('/google/callback', loginGoogleCallback);

router.get('/logout', logout);

router.patch('/password/:email', getAuthUser, verifyEmailMatch, updatePasswordUser);

router.patch('/:email', updateAdminUser);

export default router;