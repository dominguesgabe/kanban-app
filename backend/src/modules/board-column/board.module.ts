import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumnsController } from './controllers/board-column.controller';
import { BoardColumn } from './entities/board-column.entity';
import { BoardColumnsService } from './services/board-column.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardColumn])],
  providers: [BoardColumnsService],
  controllers: [BoardColumnsController],
})
export class BoardColumnsModule {}
