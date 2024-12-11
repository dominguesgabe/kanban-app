import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Priority } from '../enums';

export class UpdateColumnItemDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  priority: Priority;
}

export class MoveColumnItemDTO {
  @IsNumber()
  targetColumnId: number;

  @IsNumber()
  newPosition: number;
}
