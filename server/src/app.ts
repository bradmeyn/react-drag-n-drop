import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { projectRouter } from "./routes/projectRoutes";
import { authRouter } from "./routes/authRoutes";
import { authenticateUser } from "./middleware/authenticateUser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const apiRouter = express.Router();
apiRouter.use(authenticateUser);
apiRouter.use("/auth", authRouter);
apiRouter.use("/projects", projectRouter);

// Use apiRouter for all routes prefixed with /api
app.use("/api", apiRouter);

process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  // some other closing procedures go here
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
