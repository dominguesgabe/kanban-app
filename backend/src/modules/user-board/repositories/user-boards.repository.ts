import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserBoard } from '../entities/user-board.entity';

@Injectable()
export class UserBoardsRepository extends Repository<UserBoard> {
  constructor(private dataSource: DataSource) {
    super(UserBoard, dataSource.createEntityManager());
  }
}
