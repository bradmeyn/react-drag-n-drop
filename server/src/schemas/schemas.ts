import * as z from "zod";

export const userSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});

export const projectSchema = z.object({
  name: z.string().trim().min(2),
  userId: z.string().uuid(),
});
