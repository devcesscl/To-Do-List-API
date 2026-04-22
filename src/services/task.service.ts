import { TaskRepository, CreateTaskDto, UpdateTaskDto } from '../repositories/task.repository';
import { Task, TaskStatus } from '../models/task.model';

const STATUS_TRANSITIONS: Record<TaskStatus, TaskStatus[]> = {
  [TaskStatus.PENDING]: [TaskStatus.IN_PROGRESS],
  [TaskStatus.IN_PROGRESS]: [TaskStatus.COMPLETED],
  [TaskStatus.COMPLETED]: [],
};

export class TaskService {
  constructor(private readonly repo: TaskRepository) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    this.validateTaskDto(dto);
    return this.repo.create(dto);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.repo.findById(id);
    if (!task) throw new Error(`Task with id ${id} not found`);
    return task;
  }

  async getTasksByUser(userId: number): Promise<Task[]> {
    return this.repo.findByUser(userId);
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    if (dto.status) {
      const current = await this.repo.findById(id);
      if (!current) throw new Error(`Task with id ${id} not found`);
      this.validateStatusTransition(current.status, dto.status);
    }
    const updated = await this.repo.update(id, dto);
    if (!updated) throw new Error(`Task with id ${id} not found`);
    return updated;
  }

  async deleteTask(id: number): Promise<void> {
    const deleted = await this.repo.softDelete(id);
    if (!deleted) throw new Error(`Task with id ${id} not found`);
  }

  private validateTaskDto(dto: CreateTaskDto): void {
    if (!dto.title || dto.title.trim() === '') {
      throw new Error('Title is required');
    }
    if (dto.title.length > 200) {
      throw new Error('Title must be 200 characters or less');
    }
  }

  private validateStatusTransition(current: TaskStatus, next: TaskStatus): void {
    const allowed = STATUS_TRANSITIONS[current];
    if (!allowed.includes(next)) {
      throw new Error(`Invalid status transition: ${current} -> ${next}`);
    }
  }
}

export default TaskService;
