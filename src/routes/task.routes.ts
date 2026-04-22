import { Router } from 'express';
import { createTask, getTask, getUserTasks, updateTask, deleteTask } from '../controllers/task.controller';

const router = Router();

router.post('/', createTask);
router.get('/user/:userId', getUserTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
