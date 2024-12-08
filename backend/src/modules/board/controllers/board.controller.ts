import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { BoardsService } from '../services/board.service';
import { Board } from '../entities/board.entity';
import { CreateBoardDTO } from '../dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createBoardDTO: CreateBoardDTO,
  ): Promise<Board> {
    return this.boardsService.create({ createBoardDTO, email: req.user.email });
  }
}
