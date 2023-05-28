import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import * as z from 'zod';
const prisma = new PrismaClient();
