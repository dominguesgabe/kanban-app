import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardColumn } from '../entities/board-column.entity';
import { BoardColumnsRepository } from '../repositories/board-column.repository';
import { BoardColumnDTO, UpdateBoardColumnDTO } from '../dto';
import { Board } from 'src/modules/board/entities/board.entity';
import { BoardsRepository } from 'src/modules/board/repositories/board.repository';

@Injectable()
export class BoardColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private boardColumnRepository: BoardColumnsRepository,
    @InjectRepository(Board)
    private boardRepository: BoardsRepository,
  ) {}

  async create(createBoardColumnDTO: BoardColumnDTO): Promise<BoardColumn> {
    const board = await this.boardRepository.findOne({
      where: { id: createBoardColumnDTO.boardId },
    });

    if (!board) {
      throw new NotFoundException(
        `Board with id ${createBoardColumnDTO.boardId} not found`,
      );
    }

    const boardColumn = this.boardColumnRepository.create({
      ...createBoardColumnDTO,
      board,
    });

    return await this.boardColumnRepository.save(boardColumn);
  }

  async findAll({ boardId }: { boardId: number }): Promise<BoardColumn[]> {
    const columns = await this.boardColumnRepository.find({
      where: { board: { id: boardId } },
      relations: ['board', 'columnItems'],
    });

    return columns;
  }

  findOne(id: number): Promise<BoardColumn | null> {
    return this.boardColumnRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.boardColumnRepository.delete(id);
  }

  async update(
    id: number,
    updateBoardColumnDTO: UpdateBoardColumnDTO,
  ): Promise<BoardColumn> {
    const board = await this.boardColumnRepository.findOne({
      where: { id },
    });

    const updatedBoard = {
      ...board,
      ...updateBoardColumnDTO,
    };

    await this.boardColumnRepository.update(id, updatedBoard);

    return updatedBoard;
  }
}
