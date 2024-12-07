import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBoardsController } from './controllers/user-board.controller';
import { UserBoard } from './entities/user-board.entity';
import { UserBoardsService } from './services/user-board.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBoard])],
  providers: [UserBoardsService],
  controllers: [UserBoardsController],
})
export class UserBoardsModule {}
