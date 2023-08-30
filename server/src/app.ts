import express from "express";
import { projectRouter } from "./routes/projectRoutes";
import { authRouter } from "./routes/authRoutes";
const app = express();

const apiRouter = express.Router();

// Add your existing routes to apiRouter
apiRouter.use("/auth", authRouter);
apiRouter.use("/projects", projectRouter);

// Use apiRouter for all routes prefixed with /api
app.use("/api", apiRouter);

app.listen(3000);
