import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardsService } from './services/board.service';
import { BoardsController } from './controllers/board.controller';
import { BoardsRepository } from './repositories/board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardsService],
  controllers: [BoardsController],
  // exports: [TypeOrmModule],
  exports: [BoardsService, BoardsRepository],
})
export class BoardsModule {}
