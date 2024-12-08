import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBoard } from './entities/user-board.entity';
import { UserBoardsRepository } from './repositories/user-boards.repository';
import { UserBoardsService } from './services/user-board.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserBoard])],
  providers: [UserBoardsService, UserBoardsRepository],
  exports: [UserBoardsRepository],
})
export class UserBoardsModule {}
