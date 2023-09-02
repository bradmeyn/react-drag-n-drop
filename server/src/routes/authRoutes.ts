import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";

export const authRouter = Router();

authRouter.route("/register").post(registerUser);

authRouter.route("/login").post(loginUser);

authRouter.route("/logout").post();
