import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { Board } from './modules/board/entities/board.entity';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([Board, User]),
  ],
})
export class AppModule {}
