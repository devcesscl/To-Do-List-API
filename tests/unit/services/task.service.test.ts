import { TaskService } from '../../../src/services/task.service';
import { TaskStatus, TaskPriority } from '../../../src/models/task.model';

const mockTask = {
  id: 1,
  title: 'Test Task',
  description: 'Description',
  status: TaskStatus.PENDING,
  priority: TaskPriority.MEDIUM,
  userId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockRepo = {
  create: jest.fn(),
  findById: jest.fn(),
  findByUser: jest.fn(),
  update: jest.fn(),
  softDelete: jest.fn(),
};

describe('TaskService - createTask', () => {
  let service: TaskService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TaskService(mockRepo as any);
  });

  it('should create a task successfully', async () => {
    mockRepo.create.mockResolvedValue(mockTask);
    const dto = { title: 'Test Task', userId: 1 };

    const result = await service.createTask(dto);

    expect(result).toEqual(mockTask);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });

  it('should throw an error if title is empty', async () => {
    await expect(service.createTask({ title: '', userId: 1 }))
      .rejects.toThrow('Title is required');
    expect(mockRepo.create).not.toHaveBeenCalled();
  });

  it('should throw an error if title exceeds 200 characters', async () => {
    const longTitle = 'A'.repeat(201);
    await expect(service.createTask({ title: longTitle, userId: 1 }))
      .rejects.toThrow('Title must be 200 characters or less');
  });
});

describe('TaskService - getTaskById', () => {
  let service: TaskService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TaskService(mockRepo as any);
  });

  it('should return task when found', async () => {
    mockRepo.findById.mockResolvedValue(mockTask);
    const result = await service.getTaskById(1);
    expect(result).toEqual(mockTask);
  });

  it('should throw error when task not found', async () => {
    mockRepo.findById.mockResolvedValue(null);
    await expect(service.getTaskById(999)).rejects.toThrow('Task with id 999 not found');
  });
});

describe('TaskService - updateTask', () => {
  let service: TaskService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TaskService(mockRepo as any);
  });

  it('should update task title successfully', async () => {
    const updated = { ...mockTask, title: 'Updated Title' };
    mockRepo.update.mockResolvedValue(updated);
    const result = await service.updateTask(1, { title: 'Updated Title' });
    expect(result.title).toBe('Updated Title');
  });

  it('should allow valid status transition PENDING -> IN_PROGRESS', async () => {
    const inProgressTask = { ...mockTask, status: TaskStatus.IN_PROGRESS };
    mockRepo.findById.mockResolvedValue(mockTask);
    mockRepo.update.mockResolvedValue(inProgressTask);

    const result = await service.updateTask(1, { status: TaskStatus.IN_PROGRESS });
    expect(result.status).toBe(TaskStatus.IN_PROGRESS);
  });

  it('should throw error for invalid status transition PENDING -> COMPLETED', async () => {
    mockRepo.findById.mockResolvedValue(mockTask);
    await expect(service.updateTask(1, { status: TaskStatus.COMPLETED }))
      .rejects.toThrow('Invalid status transition');
  });

  it('should throw error if task not found on update', async () => {
    mockRepo.update.mockResolvedValue(null);
    await expect(service.updateTask(999, { title: 'X' })).rejects.toThrow('not found');
  });
});

describe('TaskService - deleteTask', () => {
  let service: TaskService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TaskService(mockRepo as any);
  });

  it('should soft delete task successfully', async () => {
    mockRepo.softDelete.mockResolvedValue(true);
    await expect(service.deleteTask(1)).resolves.not.toThrow();
    expect(mockRepo.softDelete).toHaveBeenCalledWith(1);
  });

  it('should throw error when task to delete does not exist', async () => {
    mockRepo.softDelete.mockResolvedValue(false);
    await expect(service.deleteTask(999)).rejects.toThrow('not found');
  });
});
