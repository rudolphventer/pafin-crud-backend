import { Router, Request, Response } from 'express';
import user from '../controllers/user';
import auth from '../controllers/auth';
import { verifyToken } from '../middlewares/authentication';

const router = Router();

router.get('/users', verifyToken, user.getUsers);
router.post('/login', auth.login);

export { router };
