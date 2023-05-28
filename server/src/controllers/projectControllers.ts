import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const userId = 1;
const projectId = 1;

const createProject = async (req: Request, res: Response) => {
  const { project } = req.body;

  const newProject = await prisma.project.create({ data: project });
};

const getProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    where: {
      userId: userId,
    },
  });
  res.status(200).json(projects);
};

const getProject = async (req: Request, res: Response) => {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (project) {
    res.status(200).json(project);
  } else {
    res.status(406);
  }
};

export default getProjects;
