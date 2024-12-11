import { IsOptional } from 'class-validator';

export class UpdateBoardDTO {
  @IsOptional()
  name: string;
}
