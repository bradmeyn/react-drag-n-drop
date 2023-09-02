import { Response, Request, NextFunction } from "express";
import { userSchema, loginSchema } from "../schemas/schemas";
import { createUser, getUserByEmail } from "../services/userService";
import { generateToken, setTokenCookie } from "../utils/authUtils";
import bcrypt from "bcrypt";
import * as z from "zod";

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

    // Check if the email is already in use
    const existingUser = await getUserByEmail(validatedUser.email);

    if (existingUser) {
      console.log("User already exists");
      // If it is, respond with a 400 status code and send back an error message.
      return res.status(400).json({ errors: ["Email already in use"] });
    }

    // Create the user
    const user = await createUser(validatedUser);

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ errors: ["Something went wrong"] });
    }

    // Generate JWT
    const token = generateToken(
      user.id,
      user.email,
      process.env.JWT_SECRET!,
      "1d"
    );

    // Set HTTP-only cookie
    setTokenCookie(res, token);

    /// Respond with success message and user data
    res
      .status(201)
      .json({ success: true, user: { id: user.id, email: user.email } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    } else {
      // If it's not a Zod error, it might be something unexpected.
      // Forward it to your error-handling middleware.
      next(error);
    }
  }
};

// @desc    Login user
// @route   /api/users/login
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

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ errors: ["Something went wrong"] });
  }

  // Generate JWT
  const token = generateToken(
    user.id,
    user.email,
    process.env.JWT_SECRET!,
    "1d"
  );

  // Set HTTP-only cookie
  setTokenCookie(res, token);

  /// Respond with success message and user data
  res
    .status(200)
    .json({ success: true, user: { id: user.id, email: user.email } });
};
