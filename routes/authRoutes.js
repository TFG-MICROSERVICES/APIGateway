import express from 'express';
import { login, logout, loginGoogleCallback, checkAuth } from '../controllers/authControllers.js';
import { updateAdminUser, updatePasswordUser } from '../controllers/authControllers.js';
import { verifyEmailMatch } from '../middlewares/verifyEmailMatch.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';
import { getUser } from '../middlewares/getUser.js';

const router = express.Router();

//POST http://localhost:3000:/api/auth/login
router.post('/login', login);

//GET http://localhost:3000/api/auth/google/callback
router.get('/google/callback', loginGoogleCallback);

//GET http://localhost:3000/api/auth/logout
router.get('/logout', logout);

//PATCH http://localhost:3000/api/auth/password/:id
router.patch('/password/:id', getAuthUser, verifyEmailMatch, updatePasswordUser);

//GET http://locahost:3000/api/auth/check
router.get('/check', checkAuth, getUser);

//PATCH http://localhost:3000/api/auth/:id
router.patch('/:id', updateAdminUser);

export default router;
