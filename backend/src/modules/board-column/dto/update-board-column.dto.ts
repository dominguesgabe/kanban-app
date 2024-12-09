import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBoardColumnDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  boardId: number;
}
