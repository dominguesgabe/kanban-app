import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnItemsController } from './controllers/column-item.controller';
import { ColumnItem } from './entities/column-item.entity';
import { ColumnItemsService } from './services/column-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnItem])],
  providers: [ColumnItemsService],
  controllers: [ColumnItemsController],
})
export class ColumnItemsModule {}
