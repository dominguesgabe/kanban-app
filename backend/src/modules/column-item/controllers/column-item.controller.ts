import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import {
  CreateColumnItemDTO,
  MoveColumnItemDTO,
  UpdateColumnItemDTO,
} from '../dto';
import { ColumnItemsService } from '../services/column-item.service';
import { ColumnItem } from '../entities/column-item.entity';

@Controller('column-items')
export class ColumnItemsController {
  constructor(private columnItemsService: ColumnItemsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createColumnItemDTO: CreateColumnItemDTO,
  ): Promise<ColumnItem> {
    return this.columnItemsService.create(createColumnItemDTO);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param() { id }: { id: number }): Promise<ColumnItem> {
    return this.columnItemsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param() { id }: { id: number },
    @Body() updateColumnItemDTO: UpdateColumnItemDTO,
  ): Promise<ColumnItem> {
    return this.columnItemsService.update(id, updateColumnItemDTO);
  }

  @Patch('/:id/move')
  async moveItem(
    @Param('id') itemId: number,
    @Body() { targetColumnId, newPosition }: MoveColumnItemDTO,
  ) {
    await this.columnItemsService.moveItem(itemId, targetColumnId, newPosition);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param() { id }: { id: number }): Promise<void> {
    return this.columnItemsService.delete(id);
  }
}
