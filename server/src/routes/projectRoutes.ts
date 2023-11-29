import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectControllers";

export const projectRouter = Router();

projectRouter.route("/").get(getProjects).post(createProject);

projectRouter.route("/:projectId");
// .get(getProject)
// .delete(deleteProject)
// .update(updateProject)
