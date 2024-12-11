import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateBoardDTO {
  @IsOptional()
  @Transform(({ value }) => value ?? 'New board')
  name?: string;
}
