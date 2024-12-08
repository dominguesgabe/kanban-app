import { IsNotEmpty, IsString } from 'class-validator';

export class TableColumnDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  boardId: string;

  //increment
}
