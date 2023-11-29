import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { projectSchema } from "../schemas/schemas";
import { createProject as createProjectService } from "../services/projectService";
const prisma = new PrismaClient();

// @desc    Register a new user
// @route   /api/projects
// @access  Private
export const createProject = async (req: Request, res: Response) => {
  const validatedProject = projectSchema.parse(req.body.project);

  const newProject = await createProjectService(validatedProject);
};

// @desc    Get all projects for a user
// @route   /api/projects
// @access  Private
export const getProjects = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ errors: ["Unauthorized"] });
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: userId,
    },
  });
  res.status(200).json(projects);
};

// @desc    Get a single project
// @route   /api/projects/:id
// @access  Private
export const getProject = async (req: Request, res: Response) => {
  const projectId = req.params.id;

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
