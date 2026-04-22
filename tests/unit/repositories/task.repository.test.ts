import { TaskRepository } from '../../../src/repositories/task.repository';
import { Task, TaskStatus, TaskPriority } from '../../../src/models/task.model';

jest.mock('../../../src/models/task.model');

const mockTask = {
  id: 1, title: 'Test Task', status: TaskStatus.PENDING,
  priority: TaskPriority.MEDIUM, userId: 1,
  update: jest.fn(), destroy: jest.fn(),
};

describe('TaskRepository', () => {
  let repo: TaskRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repo = new TaskRepository();
  });

  it('should create a task', async () => {
    (Task.create as jest.Mock).mockResolvedValue(mockTask);
    const result = await repo.create({ title: 'Test Task', userId: 1 });
    expect(result).toEqual(mockTask);
    expect(Task.create).toHaveBeenCalled();
  });

  it('should find task by id', async () => {
    (Task.findByPk as jest.Mock).mockResolvedValue(mockTask);
    const result = await repo.findById(1);
    expect(result).toEqual(mockTask);
  });

  it('should return null when task not found by id', async () => {
    (Task.findByPk as jest.Mock).mockResolvedValue(null);
    const result = await repo.findById(999);
    expect(result).toBeNull();
  });

  it('should soft delete a task', async () => {
    (Task.findByPk as jest.Mock).mockResolvedValue(mockTask);
    mockTask.destroy.mockResolvedValue(undefined);
    const result = await repo.softDelete(1);
    expect(result).toBe(true);
    expect(mockTask.destroy).toHaveBeenCalled();
  });

  it('should return false when task to delete not found', async () => {
    (Task.findByPk as jest.Mock).mockResolvedValue(null);
    const result = await repo.softDelete(999);
    expect(result).toBe(false);
  });

  it('should update a task', async () => {
    const updated = { ...mockTask, title: 'Updated' };
    mockTask.update.mockResolvedValue(updated);
    (Task.findByPk as jest.Mock).mockResolvedValue(mockTask);
    const result = await repo.update(1, { title: 'Updated' });
    expect(result).toEqual(updated);
  });
});
