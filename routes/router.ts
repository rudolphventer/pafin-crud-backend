import { Router, Request, Response } from 'express';
import user from '../controllers/user';
import auth from '../controllers/login';
import { verifyToken } from '../middlewares/authentication';
import {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
    loginValidator,
} from '../middlewares/validation';

const router = Router();

router.get('/users', verifyToken, user.getUsers);
router.post('/users/create', createUserValidator, verifyToken, user.createUser);
router.get('/users/:id', verifyToken, getUserValidator, user.getUserById);
router.put('/users/:id', verifyToken, updateUserValidator, user.updateUserById);
router.delete('/users/:id', verifyToken, deleteUserValidator, user.deleteUserById);

router.post('/login', loginValidator, auth.login);

export { router };
