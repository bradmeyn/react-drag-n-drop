import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createProject = async (req: Request, res: Response) => {
  const { project } = req.body;

  const newProject = await prisma.project.create({ data: project });
};

const getProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany();
  res.json(projects);
};

export default getProjects;
