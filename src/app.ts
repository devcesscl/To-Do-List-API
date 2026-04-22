import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/tasks', taskRoutes);

export default app;
