import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Messages } from './entity/Messages';
import { Conversations } from './entity/Conversations';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'messaging_user',
  password: 'messaging_password',
  database: 'messaging_service',
  synchronize: true,
  logging: false,
  entities: [Messages, Conversations],
  migrations: [],
  subscribers: [],
});
