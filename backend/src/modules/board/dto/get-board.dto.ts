import { Priority } from 'src/modules/column-item/enums';
import { UserBoard } from 'src/modules/user-board/entities/user-board.entity';

export class BoardDTO {
  id: number;
  name: string;
  userBoards: UserBoard[];
  columns: ColumnDTO[];
  tasks: TaskDTO[];
}

export class ColumnDTO {
  id: number;
  name: string;
}

export class TaskDTO {
  id: number;
  name: string;
  description?: string;
  position: number;
  priority: Priority;
  columnId: number;
}
