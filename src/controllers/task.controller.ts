import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { TaskRepository } from '../repositories/task.repository';

const taskService = new TaskService(new TaskRepository());

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await taskService.createTask({ ...req.body, userId: (req as any).userId });
    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await taskService.getTaskById(parseInt(req.params.id));
    res.status(200).json(task);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await taskService.getTasksByUser(parseInt(req.params.userId));
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await taskService.updateTask(parseInt(req.params.id), req.body);
    res.status(200).json(task);
  } catch (error: any) {
    const status = error.message.includes('not found') ? 404 : 400;
    res.status(status).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    await taskService.deleteTask(parseInt(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
