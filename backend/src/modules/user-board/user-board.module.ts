import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBoardsController } from './controllers/user-board.controller';
import { UserBoard } from './entities/user-board.entity';
import { UserBoardsService } from './services/user-board.service';
import { UserBoardsRepository } from './repositories/user-boards.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserBoard])],
  providers: [UserBoardsService, UserBoardsRepository],
  controllers: [UserBoardsController],
  exports: [UserBoardsRepository],
})
export class UserBoardsModule {}
