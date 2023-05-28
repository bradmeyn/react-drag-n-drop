import express from 'express';
import { projectRouter } from './routes/projectRoutes';
import { authRouter } from './routes/authRoutes';
const app = express();

// app.use('/', baseRouter);
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);

app.listen(3000);
