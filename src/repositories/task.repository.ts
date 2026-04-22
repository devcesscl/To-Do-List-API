import { Task, TaskStatus, TaskPriority } from '../models/task.model';
import { Category } from '../models/category.model';

export interface CreateTaskDto {
  title: string;
  description?: string;
  priority?: string;
  dueDate?: Date;
  userId: number;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
}

export class TaskRepository {
  async create(dto: CreateTaskDto): Promise<Task> {
    return Task.create(dto as any);
  }

  async findById(id: number): Promise<Task | null> {
    return Task.findByPk(id, {
      include: [{ model: Category, attributes: ['name', 'color'], through: { attributes: [] } }],
    });
  }

  async findByUser(userId: number): Promise<Task[]> {
    return Task.scope('active').findAll({
      where: { userId },
      attributes: ['id', 'title', 'status', 'priority', 'dueDate'],
      include: [{ model: Category, attributes: ['name', 'color'], through: { attributes: [] } }],
      order: [['priority', 'DESC'], ['dueDate', 'ASC']],
    });
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task | null> {
    const task = await Task.findByPk(id);
    if (!task) return null;
    return task.update(dto);
  }

  async softDelete(id: number): Promise<boolean> {
    const task = await Task.findByPk(id);
    if (!task) return false;
    await task.destroy();
    return true;
  }
}

export default TaskRepository;
