import { DataSource } from 'typeorm';
import { User } from './modules/user/entities/user.entity';
import { Board } from './modules/board/entities/board.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database/database.sqlite',
  entities: [User, Board],
  migrations: ['../../migrations/*.ts'],
  synchronize: false,
});
