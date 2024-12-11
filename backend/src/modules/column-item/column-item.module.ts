import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardColumn } from '../board-column/entities/board-column.entity';
import { ColumnItemsController } from './controllers/column-item.controller';
import { ColumnItem } from './entities/column-item.entity';
import { ColumnItemsService } from './services/column-item.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnItem, BoardColumn]), AuthModule],
  providers: [ColumnItemsService],
  controllers: [ColumnItemsController],
})
export class ColumnItemsModule {}
