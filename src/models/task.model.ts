import {
  Model, DataTypes, Optional, Sequelize, Op,
} from 'sequelize';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

interface TaskAttributes {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  userId: number;
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'status' | 'priority'> {}

export class Task extends Model<TaskAttributes, TaskCreationAttributes>
  implements TaskAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public status!: TaskStatus;
  public priority!: TaskPriority;
  public dueDate?: Date;
  public userId!: number;
  public deletedAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize): typeof Task {
    Task.init(
      {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type: DataTypes.STRING(200), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        status: {
          type: DataTypes.ENUM(...Object.values(TaskStatus)),
          defaultValue: TaskStatus.PENDING,
        },
        priority: {
          type: DataTypes.ENUM(...Object.values(TaskPriority)),
          defaultValue: TaskPriority.MEDIUM,
        },
        dueDate: { type: DataTypes.DATE, allowNull: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        deletedAt: { type: DataTypes.DATE, allowNull: true },
      },
      {
        sequelize,
        tableName: 'tasks',
        paranoid: true,
        defaultScope: { where: { deletedAt: { [Op.is]: null as any } } },
        scopes: {
          active: { where: { deletedAt: { [Op.is]: null as any }, status: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS] } },
        },
      }
    );
    return Task;
  }
}

export default Task;
