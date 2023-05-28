import { Response, Request, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { createUser, checkUserExists } from '../services/userService';

import * as z from 'zod';
const prisma = new PrismaClient();

const userSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

// @desc    Register a new user
// @route   /api/auth/register
// @access  Public
export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate the request body against the schema
    const validatedUser = userSchema.parse(req.body);

    // Check if the email is already in use
    const existingUser = await checkUserExists(validatedUser.email);

    if (existingUser) {
      // If it is, respond with a 400 status code and send back an error message.
      return res.status(400).json({ errors: ['Email already in use'] });
    }

    // Create the user
    const newUser = await createUser(validatedUser);

    // Respond with the newly created user
    res.status(201).json({ ...newUser, password: undefined });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If Zod is throwing the error, respond with a 400 status code and send back the error messages.
      res.status(400).json({ errors: error.errors });
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
export const loginUser = async (req: Request, res: Response) => {
  res.json('Login');
};
