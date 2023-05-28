import { Router } from 'express';
import { createUser, loginUser } from '../controllers/authController';

export const authRouter = Router();

authRouter.route('/').post(createUser);

authRouter.route('/login').post(loginUser);

authRouter.route('/logout').post();
