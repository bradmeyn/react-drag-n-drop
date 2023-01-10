import { Router } from 'express';
import { createUser, loginUser } from '../controllers/userController';

export const userRouter = Router();

userRouter.route('/').post(createUser);

userRouter.route('/login').post(loginUser);

userRouter.route('/logout').post();
