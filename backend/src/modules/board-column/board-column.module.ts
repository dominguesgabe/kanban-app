import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Board } from '../board/entities/board.entity';
import { BoardColumnsController } from './controllers/board-column.controller';
import { BoardColumn } from './entities/board-column.entity';
import { BoardColumnsService } from './services/board-column.service';
import { BoardColumnsRepository } from './repositories/board-column.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn, Board]), AuthModule],
  providers: [BoardColumnsService, BoardColumnsRepository],
  controllers: [BoardColumnsController],
  exports: [BoardColumnsRepository],
})
export class BoardColumnsModule {}
