import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { BoardColumnsController } from './controllers/board-column.controller';
import { BoardColumn } from './entities/board-column.entity';
import { BoardColumnsService } from './services/board-column.service';
import { Board } from '../board/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn, Board]), AuthModule],
  providers: [BoardColumnsService],
  controllers: [BoardColumnsController],
})
export class BoardColumnsModule {}
