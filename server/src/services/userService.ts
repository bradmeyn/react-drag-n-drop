import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import * as z from "zod";
import { userSchema } from "../schemas/schemas";
const prisma = new PrismaClient();

export const createUser = async (user: z.infer<typeof userSchema>) => {
  const hashedPassword = await hash(user.password, 10);

  const newUser = await prisma.user.create({
    data: {
      ...user,
      password: hashedPassword,
    },
  });

  console.log("New user:", newUser);

  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};
