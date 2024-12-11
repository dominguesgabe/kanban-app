import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBoardColumnDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
