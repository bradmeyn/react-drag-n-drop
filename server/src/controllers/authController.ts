import { Response, Request, NextFunction } from "express";
import { userSchema, loginSchema } from "../schemas/schemas";

import { TokenPayload } from "../utils/authUtils";

import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../services/userService";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "../utils/authUtils";
import bcrypt from "bcrypt";
import * as z from "zod";
import { JwtPayload } from "jsonwebtoken";

// @desc    Register a new user
// @route   /api/auth/register
// @access  Public
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request body against the schema
    const validatedUser = userSchema.parse(req.body);
    console.log("Validated user:", validatedUser);

    // Check if the email is already in use
    const existingUser = await getUserByEmail(validatedUser.email);

    if (existingUser) {
      console.log("User already exists");
      // If it is, respond with a 400 status code and send back an error message.
      return res.status(400).json({ errors: ["Email already in use"] });
    }

    // Create the user
    const user = await createUser(validatedUser);

    // Generate refresh token
    createRefreshToken(res, user);

    // Generate access token
    const accessToken = createAccessToken(user);

    /// Respond with success message and user data
    res.status(201).json({
      accessToken,
      user: { id: user.id },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      console.log("Error:", error);
      // If it's not a Zod error, it might be something unexpected.
      // Forward it to your error-handling middleware.
      next(error);
    }
  }
};

// Refresh token\
// @desc    Refresh access token
// @route   /api/auth/refresh
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  // Get the refresh token from the cookie
  const token: string = req.cookies?.token as JwtPayload["id"];

  if (!token) {
    return res.status(401).json({ errors: ["Unauthorized"] });
  }

  if (!process.env.REFRESH_SECRET || !process.env.ACCESS_SECRET) {
    throw new Error("Missing crucial environment variables");
  }

  try {
    // Verify the refresh token
    const decodedToken = verifyToken(token, process.env.REFRESH_SECRET);

    // Retrieve the user from the database
    const user = await getUserById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ errors: ["Unauthorized"] });
    }

    // Generate refresh token
    createRefreshToken(res, user);

    // Generate access token
    const accessToken = createAccessToken(user);

    // Respond with the new access token and user data
    return res.status(200).json({
      accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(401).json({ errors: ["Unauthorized"] });
  }
};

// @desc    Login user
// @route   /api/auth/login
// @access  Public
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Login body:", req.body);
  const validatedUser = loginSchema.parse(req.body);

  // Find the user in the database
  const user = await getUserByEmail(validatedUser.email);

  if (!user) {
    return res
      .status(400)
      .json({ errors: ["Invalid login details, please try again"] });
  }

  // Check the password
  const isMatch = await bcrypt.compare(validatedUser.password, user.password);

  if (!isMatch) {
    return res
      .status(400)
      .json({ errors: ["Invalid login details, please try again"] });
  }

  // Generate refresh token
  createRefreshToken(res, user);

  // Generate access token
  const accessToken = createAccessToken(user);

  /// Respond with success message and user data
  res.status(200).json({
    accessToken,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });
};
