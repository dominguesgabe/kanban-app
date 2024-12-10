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
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }

    const updatedItem = {
      ...item,
      ...updateColumnItemDTO,
    };

    await this.columnItemsRepository.update(id, updatedItem);

    return updatedItem;
  }

  async moveItem(itemId: number, targetColumnId: number, newPosition: number) {
    const item = await this.columnItemsRepository.findOne({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException(`Item with id ${itemId} not found`);
    }

    const targetColumn = await this.boardColumnsRepository.findOne({
      where: { id: targetColumnId },
      relations: ['columnItems'],
    });

    if (!targetColumn) {
      throw new NotFoundException(
        `Board Column with id ${targetColumnId} not found`,
      );
    }

    const items = targetColumn.columnItems;
    const itemIndex = items.findIndex((i) => i.id === itemId);

    if (itemIndex === -1) {
      throw new NotFoundException(`Item with id ${itemId} not found in column`);
    }

    items.splice(itemIndex, 1);
    items.splice(newPosition, 0, item);

    items.forEach(async (i, index) => {
      await this.columnItemsRepository.update(i.id, { position: index });
    });
  }
}
