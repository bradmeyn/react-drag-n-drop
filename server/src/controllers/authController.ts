import { Response, Request, NextFunction } from "express";
import { userSchema, loginSchema } from "../schemas/schemas";
import { createUser, getUserByEmail } from "../services/userService";

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
      // If it is, respond with a 400 status code and send back an error message.
      return res.status(400).json({ errors: ["Email already in use"] });
    }

    // Create the user
    const newUser = await createUser(validatedUser);

    // Respond with the newly created user
    res.status(201).json({ ...newUser, password: undefined });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If Zod is throwing the error, respond with a 400 status code and send back the error messages.
      return res.status(400);
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
  const validatedUser = loginSchema.parse(req.body);

  // Find the user in the database
  const user = await getUserByEmail(validatedUser.email);

  if (!user) {
    return res.status(400).json({ errors: ["Email not found"] });
  }

  // Check the password
  const isMatch = await bcrypt.compare(validatedUser.password, user.password);

  if (!isMatch) {
    return res.status(400).json({ errors: ["Invalid password"] });
  }

  // Generate JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET, // make sure to set this env variable
    { expiresIn: "1d" } // token will expire in 1 day
  );

  // Respond with token
  res.status(200).json({ token });
};
