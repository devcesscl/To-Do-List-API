import { Request, Response } from 'express';
import { TaskStatus, TaskPriority } from '../../../src/models/task.model';

// Mock the service before importing the controller
jest.mock('../../../src/services/task.service');
jest.mock('../../../src/repositories/task.repository');

import { createTask, getTask, updateTask, deleteTask } from '../../../src/controllers/task.controller';
import { TaskService } from '../../../src/services/task.service';

const mockTask = {
  id: 1, title: 'Test', status: TaskStatus.PENDING,
  priority: TaskPriority.MEDIUM, userId: 1,
};

const mockReq = (body = {}, params = {}) => ({ body, params, userId: 1 } as unknown as Request);
const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('TaskController - createTask', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should return 201 with created task', async () => {
    (TaskService.prototype.createTask as jest.Mock).mockResolvedValue(mockTask);
    const req = mockReq({ title: 'Test' });
    const res = mockRes();

    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockTask);
  });

  it('should return 400 when title is missing', async () => {
    (TaskService.prototype.createTask as jest.Mock).mockRejectedValue(new Error('Title is required'));
    const req = mockReq({ title: '' });
    const res = mockRes();

    await createTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Title is required' });
  });
});

describe('TaskController - getTask', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should return 200 with task', async () => {
    (TaskService.prototype.getTaskById as jest.Mock).mockResolvedValue(mockTask);
    const req = mockReq({}, { id: '1' });
    const res = mockRes();

    await getTask(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockTask);
  });

  it('should return 404 when task not found', async () => {
    (TaskService.prototype.getTaskById as jest.Mock).mockRejectedValue(new Error('not found'));
    const req = mockReq({}, { id: '999' });
    const res = mockRes();

    await getTask(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('TaskController - updateTask', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should return 200 with updated task', async () => {
    const updated = { ...mockTask, title: 'Updated' };
    (TaskService.prototype.updateTask as jest.Mock).mockResolvedValue(updated);
    const req = mockReq({ title: 'Updated' }, { id: '1' });
    const res = mockRes();

    await updateTask(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it('should return 400 on invalid status transition', async () => {
    (TaskService.prototype.updateTask as jest.Mock).mockRejectedValue(new Error('Invalid status transition'));
    const req = mockReq({ status: TaskStatus.COMPLETED }, { id: '1' });
    const res = mockRes();

    await updateTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe('TaskController - deleteTask', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should return 204 on successful delete', async () => {
    (TaskService.prototype.deleteTask as jest.Mock).mockResolvedValue(undefined);
    const req = mockReq({}, { id: '1' });
    const res = mockRes();

    await deleteTask(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('should return 404 when task not found', async () => {
    (TaskService.prototype.deleteTask as jest.Mock).mockRejectedValue(new Error('not found'));
    const req = mockReq({}, { id: '999' });
    const res = mockRes();

    await deleteTask(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
