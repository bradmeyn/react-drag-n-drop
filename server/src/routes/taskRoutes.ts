import { Router } from "express";
// Import your task controllers
// import { getTasks, createTask, getTask, deleteTask, updateTask } from "../controllers/taskControllers";

export const taskRouter = Router({ mergeParams: true });

// Routes for '/projects/:projectId/tasks'
taskRouter
  .route("/")
  .get(getTasks) // GET /projects/:projectId/tasks - Get all tasks for a specific project
  .post(createTask); // POST /projects/:projectId/tasks - Create a new task for a specific project

taskRouter
  .route("/:taskId")
  .get(getTask) // GET /projects/:projectId/tasks/:taskId - Get a specific task
  .delete(deleteTask) // DELETE /projects/:projectId/tasks/:taskId - Delete a specific task
  .put(updateTask); // PUT /projects/:projectId/tasks/:taskId - Update a specific task
