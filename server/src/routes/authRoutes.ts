import { Router } from "express";
import {
  loginUser,
  registerUser,
  refreshToken,
} from "../controllers/authController";

export const authRouter = Router();

authRouter.route("/login").post(loginUser);

authRouter.route("/logout").post();

authRouter.route("/refresh").post(refreshToken);

authRouter.route("/register").post(registerUser);
