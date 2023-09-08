import { create } from "domain";
import { Response } from "express";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { User } from "@prisma/client";

export interface TokenPayload extends JwtPayload {
  id: string;
}

export const createAccessToken = (user: User): string => {
  return sign({ id: user.id }, process.env.ACCESS_SECRET!, {
    expiresIn: "10m",
  });
};

export const createRefreshToken = (user: User): string => {
  return sign({ id: user.id }, process.env.REFRESH_SECRET!, {
    expiresIn: "1d",
  });
};

export const setTokenCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export const verifyToken = (token: string, secret: string): TokenPayload => {
  // Changed to TokenPayload
  try {
    const decoded = verify(token, secret);
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      return decoded as TokenPayload; // Cast as TokenPayload
    } else {
      throw new Error("Token verification failed");
    }
  } catch (error) {
    // Handle the error appropriately
    throw new Error("Token verification failed");
  }
};
