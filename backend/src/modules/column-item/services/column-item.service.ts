import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnItem } from '../entities/column-item.entity';
import { ColumnItemsRepository } from '../repositories/column-item.repository';
import { CreateColumnItemDTO, UpdateColumnItemDTO } from '../dto';
import { BoardColumn } from 'src/modules/board-column/entities/board-column.entity';
import { BoardColumnsRepository } from 'src/modules/board-column/repositories/board-column.repository';

@Injectable()
export class ColumnItemsService {
  constructor(
    @InjectRepository(ColumnItem)
    private columnItemsRepository: ColumnItemsRepository,
    @InjectRepository(BoardColumn)
    private boardColumnsRepository: BoardColumnsRepository,
  ) {}

  async create(createColumnItemDTO: CreateColumnItemDTO): Promise<ColumnItem> {
    const boardColumn = await this.boardColumnsRepository.findOne({
      where: { id: createColumnItemDTO.columnId },
      relations: ['columnItems'],
    });

    if (!boardColumn) {
      throw new NotFoundException(
        `Board Column with id ${createColumnItemDTO.columnId} not found`,
      );
    }
    const columnItem = this.columnItemsRepository.create({
      name: createColumnItemDTO.name,
      description: createColumnItemDTO.description,
      priority: createColumnItemDTO.priority,
      column: boardColumn,
      position: boardColumn.columnItems.length,
    });

    await this.columnItemsRepository.save(columnItem);

    return columnItem;
  }

  async findOne(id: number): Promise<ColumnItem> {
    return await this.columnItemsRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.columnItemsRepository.delete(id);
  }

  async update(
    id: number,
    updateColumnItemDTO: UpdateColumnItemDTO,
  ): Promise<ColumnItem> {
    const item = await this.columnItemsRepository.findOne({
      where: { id },
      relations: ['column'],
    });

    if (!item) {
      throw new NotFoundException(`Column Item with id ${id} not found`);
    }

    // const newColumn = await this.columnItemsRepository.findOne({
    //   where: { column: { id: updateColumnItemDTO.columnId } },
    //   relations: ['column'],
    // });
    // console.log(newColumn);

    const updatedItem = {
      ...item,
      ...{
        ...updateColumnItemDTO,
        // columnItem: newColumn,
      },
    };

    await this.columnItemsRepository.update(id, updatedItem);

    return updatedItem;
  }
}
