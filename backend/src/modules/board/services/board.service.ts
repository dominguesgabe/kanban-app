import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../entities/board.entity';
import { BoardsRepository } from '../repositories/board.repository';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private usersRepository: BoardsRepository,
  ) {}

  findAll(): Promise<Board[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Board | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
