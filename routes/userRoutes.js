import express from 'express';
import { registerUser, deleteUser, updateUser, updateEmailUser, getUsers, getUser } from '../controllers/userController.js';
import { registerAuthUser } from '../middlewares/registerAuthUser.js';
import { deleteAuthUser } from '../middlewares/deleteAuthUser.js';
import { getAuthUser } from '../middlewares/getAuthUser.js';
import { updateEmailAuth } from '../middlewares/updateEmailAuth.js';
import { logout } from '../controllers/authControllers.js';
import { verifyEmailMatch } from '../middlewares/verifyEmailMatch.js';

const router = express.Router();

router.get('/', getAuthUser, getUsers);

router.get('/:id', getAuthUser, getUser);

router.post('/register', registerAuthUser, registerUser);

router.post('/register/google', registerUser);

router.delete('/:id', getAuthUser, verifyEmailMatch, deleteAuthUser, deleteUser);

router.put('/:id', getAuthUser, verifyEmailMatch, updateUser);

router.patch('/email/:id', getAuthUser, verifyEmailMatch, updateEmailAuth, updateEmailUser, logout);

export default router;
