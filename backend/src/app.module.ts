import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './modules/board/board.module';
import { UsersModule } from './modules/user/user.module';
import { dataSourceOptions } from 'db/data-source';
import { UserBoardsModule } from './modules/user-board/user-board.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    BoardsModule,
    UserBoardsModule,
  ],
})
export class AppModule {}
