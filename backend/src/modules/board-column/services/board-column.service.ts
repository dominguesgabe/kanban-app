import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardColumn } from '../entities/board-column.entity';
import { BoardColumnsRepository } from '../repositories/board-column.repository';

@Injectable()
export class BoardColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private boardColumnRepository: BoardColumnsRepository,
  ) {}

  findAll(): Promise<BoardColumn[]> {
    return this.boardColumnRepository.find();
  }

  findOne(id: number): Promise<BoardColumn | null> {
    return this.boardColumnRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.boardColumnRepository.delete(id);
  }
}
