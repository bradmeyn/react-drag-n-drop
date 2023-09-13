import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/authUtils";

interface JwtPayload {
  id: string;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
  cookies: {
    refreshToken?: string;
  };
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // Get the access token from the request headers
  let accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    // Verify the token and attach user to the request object
    const tokenPayload = verifyToken(accessToken, process.env.ACCESS_SECRET!);
    req.user = tokenPayload;

    return next();
  } catch (error) {
    res.status(401).json({ message: "Token verification failed" });
  }
};
