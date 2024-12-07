import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
