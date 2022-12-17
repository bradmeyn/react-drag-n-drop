import express from 'express';
import { projectRouter } from './routes/projectRoutes';
const app = express();

app.use('/api/projects', projectRouter);

app.listen(3000);
