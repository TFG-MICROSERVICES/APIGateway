import express from 'express';
import { login, logout, loginGoogleCallback, checkAuth } from '../controllers/authControllers.js';
import { updateAdminUser, updatePasswordUser } from '../controllers/authControllers.js';
import { verifyEmailMatch } from '../middlewares/verifyEmailMatch.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';
import { getUser } from '../middlewares/getUser.js';
import { registerAuthUser } from '../services/authService.js';

const router = express.Router();

//POST http://localhost:3000:/api/auth/login
router.post('/login', login);

//POST http://localhost:3000/api/auth/register
router.post('/register', registerAuthUser);

//GET http://localhost:3000/api/auth/google/callback
router.get('/google/callback', loginGoogleCallback);

//GET http://localhost:3000/api/auth/logout
router.get('/logout', logout);

//PATCH http://localhost:3000/api/auth/password/:email
router.patch('/password/:email', getAuthUser, verifyEmailMatch, updatePasswordUser);

//GET http://locahost:3000/api/auth/check
router.get('/check', checkAuth, getUser);

//PATCH http://localhost:3000/api/auth/:id
router.patch('/:id', updateAdminUser);

export default router;
