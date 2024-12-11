import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BoardColumnDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  boardId: number;
}
