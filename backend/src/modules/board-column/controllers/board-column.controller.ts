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
import { BoardColumnDTO } from '../dto/create-board-column.dto';
import { BoardColumn } from '../entities/board-column.entity';
import { BoardColumnsService } from '../services/board-column.service';
import { UpdateBoardColumnDTO } from '../dto/update-board-column.dto';

@Controller('board-columns')
export class BoardColumnsController {
  constructor(private boardColumnsService: BoardColumnsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createBoardColumnDTO: BoardColumnDTO,
  ): Promise<BoardColumn> {
    return this.boardColumnsService.create(createBoardColumnDTO);
  }

  @UseGuards(AuthGuard)
  @Get(':boardId')
  async findAll(@Param() boardId: { boardId: number }): Promise<BoardColumn[]> {
    return this.boardColumnsService.findAll(boardId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param() id: number,
    @Body() updateBoardColumnDTO: UpdateBoardColumnDTO,
  ): Promise<BoardColumn> {
    return this.boardColumnsService.update(id, updateBoardColumnDTO);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param() { id }: { id: number }): Promise<void> {
    return this.boardColumnsService.delete(id);
  }
}
