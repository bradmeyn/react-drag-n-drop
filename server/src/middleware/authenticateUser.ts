import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, Secret } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
  cookies: {
    token?: string;
  };
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // If the user is trying to log in or register, let them through.
  if (req.path === "/auth/login" || req.path === "/auth/register") {
    console.log("User is trying to log in or register");
    next();
    return;
  }

  const token = req.cookies.token;

  console.log("TOKEN");

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: "Something went wrong" });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as Secret,
    (err: VerifyErrors | null, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token verification failed" });
        return;
      }

      if (!decoded || typeof decoded === "string") {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      req.user = decoded as JwtPayload;
      next();
    }
  );
};
