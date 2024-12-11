import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardColumn } from '../entities/board-column.entity';

@Injectable()
export class BoardColumnsRepository extends Repository<BoardColumn> {
  constructor(private dataSource: DataSource) {
    super(BoardColumn, dataSource.createEntityManager());
  }
}
