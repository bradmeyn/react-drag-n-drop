import { Router } from "express";

export const projectRouter = Router();

// projectRouter.route("/").get(getProjects);
// .post(createProject)

projectRouter.route("/:projectId");
// .get(getProject)
// .delete(deleteProject)
// .update(updateProject)
