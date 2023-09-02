import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (
  id: string,
  email: string,
  secret: string,
  expiresIn: string
): string => {
  return jwt.sign({ id, email }, secret, { expiresIn });
};

export const setTokenCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};
