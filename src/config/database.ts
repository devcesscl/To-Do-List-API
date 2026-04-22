import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelizeConfig = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'todolist_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '',
  logging: process.env.NODE_ENV !== 'test' ? console.log : false,
  pool: { max: 10, min: 2, acquire: 30000, idle: 10000 },
});

export default sequelizeConfig;
