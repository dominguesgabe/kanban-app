import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBoard } from '../entities/user-board.entity';
import { UserBoardsRepository } from '../repositories/user-boards.repository';

@Injectable()
export class UserBoardsService {
  constructor(
    @InjectRepository(UserBoard)
    private userBoardsRepository: UserBoardsRepository,
  ) {}
}
