import { Controller } from '@nestjs/common';
import { BoardsService } from '../services/board.service';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}
}
