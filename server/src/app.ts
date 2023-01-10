import express from 'express';
import { projectRouter } from './routes/projectRoutes';
import { userRouter } from './routes/userRoutes';
const app = express();

// app.use('/', baseRouter);
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);

app.listen(3000);
