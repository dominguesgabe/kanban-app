import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnItem } from '../entities/column-item.entity';
import { ColumnItemsRepository } from '../repositories/column-item.repository';

@Injectable()
export class ColumnItemsService {
  constructor(
    @InjectRepository(ColumnItem)
    private columnItemsRepository: ColumnItemsRepository,
  ) {}

  // async create(createBoardColumnDTO: BoardColumnDTO): Promise<ColumnItem> {
  //   const board = await this.columnItemsRepository.findOne({
  //     where: { id: createBoardColumnDTO.boardId },
  //   });

  //   if (!board) {
  //     throw new NotFoundException(
  //       `Board with id ${createBoardColumnDTO.boardId} not found`,
  //     );
  //   }

  //   const boardColumn = this.columnItemsRepository.create({
  //     ...createBoardColumnDTO,
  //     board,
  //   });

  //   return await this.columnItemsRepository.save(boardColumn);
  // }

  // async findAll({ boardId }: { boardId: number }): Promise<ColumnItem[]> {
  //   const columns = await this.columnItemsRepository.find({
  //     where: { board: { id: boardId } },
  //     relations: ['board'],
  //   });

  //   return columns;
  // }

  // findOne(id: number): Promise<ColumnItem | null> {
  //   return this.columnItemsRepository.findOneBy({ id });
  // }

  // async delete(id: number): Promise<void> {
  //   await this.columnItemsRepository.delete(id);
  // }

  // async update(
  //   id: number,
  //   updateBoardColumnDTO: UpdateBoardColumnDTO,
  // ): Promise<ColumnItem> {
  //   const board = await this.columnItemsRepository.findOne({
  //     where: { id },
  //   });

  //   const updatedBoard = {
  //     ...board,
  //     ...updateBoardColumnDTO,
  //   };

  //   await this.columnItemsRepository.update(id, updatedBoard);

  //   return updatedBoard;
  // }
}
