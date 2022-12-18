import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController';

export const userRouter = Router();

userRouter.route('/').post(registerUser);

userRouter.route('/login').post(loginUser);
