import { Controller } from '@nestjs/common';
import { BoardColumnsService } from '../services/board-column.service';

@Controller('board-columns')
export class BoardColumnsController {
  constructor(private boardColumnsService: BoardColumnsService) {}
}
