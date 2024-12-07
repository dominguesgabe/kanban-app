import { Body, Controller, Post } from '@nestjs/common';
import { BoardsService } from '../services/board.service';
import { Board } from '../entities/board.entity';
import { CreateBoardDTO } from '../dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDTO): Promise<Board> {
    return this.boardsService.create(createBoardDto);
  }
}
