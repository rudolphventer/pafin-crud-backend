import { Router, Request, Response } from 'express';
import user from '../controllers/user';
import auth from '../controllers/login';
import { verifyToken } from '../middlewares/authentication';

const router = Router();

router.get('/users', verifyToken, user.getUsers);
router.post("/users/create", user.createUser);
router.get("/users/:id", user.getUserById);

router.post('/login', auth.login);

export { router };
