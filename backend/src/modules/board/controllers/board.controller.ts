import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from '../services/board.service';
import { Board } from '../entities/board.entity';
import { CreateBoardDTO } from '../dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { UserBoard } from 'src/modules/user-board/entities/user-board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createBoardDTO: CreateBoardDTO,
  ): Promise<Board> {
    return this.boardsService.create({ createBoardDTO, userId: req.user.id });
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req): Promise<UserBoard[]> {
    return this.boardsService.findAll(req.user.sub);
  }
}
