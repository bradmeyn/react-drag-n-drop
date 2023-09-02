import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// export const createProject = async (req: Request, res: Response) => {
//   const { project } = req.body;

//   const newProject = await prisma.project.create({ data: project });
// };

// export const getProjects = async (req: Request, res: Response) => {
//   const userId = req.user?.id;

//   const projects = await prisma.project.findMany({
//     where: {
//       userId: userId,
//     },
//   });
//   res.status(200).json(projects);
// };

// export const getProject = async (req: Request, res: Response) => {
//   const projectId = req.params.id;

//   const project = await prisma.project.findUnique({
//     where: {
//       id: projectId,
//     },
//   });

//   if (project) {
//     res.status(200).json(project);
//   } else {
//     res.status(406);
//   }
// };
