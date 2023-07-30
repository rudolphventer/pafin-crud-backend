import { Router, Request, Response } from 'express';
import user from '../controllers/user';
import auth from '../controllers/login';
import { verifyToken } from '../middlewares/authentication';

const router = Router();

router.get('/users', verifyToken, user.getUsers);
router.post('/users/create',verifyToken, user.createUser);
router.get('/users/:id',verifyToken, user.getUserById);
router.put('/users/:id',verifyToken, user.updateUserById);
router.delete('/users/:id',verifyToken, user.deleteUserById);

router.post('/login', auth.login);

export { router };
