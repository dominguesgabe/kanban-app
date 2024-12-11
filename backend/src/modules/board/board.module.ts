import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserBoard } from '../user-board/entities/user-board.entity';
import { UserBoardsModule } from '../user-board/user-board.module';
import { User } from '../user/entities/user.entity';
import { UsersModule } from '../user/user.module';
import { BoardsController } from './controllers/board.controller';
import { Board } from './entities/board.entity';
import { BoardsRepository } from './repositories/board.repository';
import { BoardsService } from './services/board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User, UserBoard]),
    UsersModule,
    AuthModule,
    UserBoardsModule,
  ],
  providers: [BoardsService, BoardsRepository],
  exports: [BoardsRepository, BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
