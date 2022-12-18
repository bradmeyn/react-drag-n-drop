import { Response, Request } from 'express';

// @desc    Register a new user
// @route   /api/users
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  res.json('Register');
};

// @desc    Login user
// @route   /api/users/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  res.json('Login');
};
