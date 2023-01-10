import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// @desc    Register a new user
// @route   /api/users
// @access  Public
export const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  // const user = {
  //   firstName: 'Brad',
  //   lastName: 'Meyn',
  //   email: 'bradmeyn@gmail.com',
  // };

  // const newUser = await prisma.user.create({ data: user });
  // console.log(newUser);
  res.json('thanks');
};

// @desc    Login user
// @route   /api/users/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  res.json('Login');
};
