import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserBoardsModule } from '../user-board/user-board.module';
import { UsersModule } from '../user/user.module';
import { BoardsController } from './controllers/board.controller';
import { Board } from './entities/board.entity';
import { BoardsService } from './services/board.service';
import { User } from '../user/entities/user.entity';
import { UserBoard } from '../user-board/entities/user-board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, User, UserBoard]),
    UsersModule,
    AuthModule,
    UserBoardsModule,
  ],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
