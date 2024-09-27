import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Task } from './src/task/entity/task';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Task],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});