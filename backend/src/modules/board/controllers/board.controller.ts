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
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CreateBoardDTO } from '../dto';
import { Board } from '../entities/board.entity';
import { BoardsService } from '../services/board.service';
import { UpdateBoardDTO } from '../dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createBoardDTO: CreateBoardDTO,
  ): Promise<Board> {
    return this.boardsService.create({ createBoardDTO, userId: req.user.sub });
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req): Promise<Board[]> {
    return this.boardsService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findByIdAndValidateUser(
    @Request() req,
    @Param() { id }: { id: number },
  ): Promise<Board> {
    return this.boardsService.findByIdAndValidateUser({
      boardId: id,
      userId: req.user.sub,
    });
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param() { id }: { id: number }): Promise<void> {
    return this.boardsService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param() id: number,
    @Body() updateBoardDTO: UpdateBoardDTO,
  ): Promise<Board> {
    return this.boardsService.update(id, updateBoardDTO);
  }
}
