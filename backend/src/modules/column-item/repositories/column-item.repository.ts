import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ColumnItem } from '../entities/column-item.entity';

@Injectable()
export class ColumnItemsRepository extends Repository<ColumnItem> {
  constructor(private dataSource: DataSource) {
    super(ColumnItem, dataSource.createEntityManager());
  }
}
