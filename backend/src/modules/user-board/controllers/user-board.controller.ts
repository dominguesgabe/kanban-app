import { Controller } from '@nestjs/common';
import { UserBoardsService } from '../services/user-board.service';

@Controller('user-board')
export class UserBoardsController {
  constructor(private userBoardService: UserBoardsService) {}
}
