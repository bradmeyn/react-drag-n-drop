import { PrismaClient } from "@prisma/client";
import * as z from "zod";
import { projectSchema } from "../schemas/schemas";
const prisma = new PrismaClient();

export const createProject = async (project: z.infer<typeof projectSchema>) => {
  const newProject = await prisma.project.create({
    data: {
      ...project,
    },
  });

  console.log("New project:", newProject);

  return newProject;
};
