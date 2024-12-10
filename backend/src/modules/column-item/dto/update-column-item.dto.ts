import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Priority } from '../enums';

export class UpdateColumnItemDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  position: number;

  @IsNumber()
  @IsOptional()
  columnId: number;

  @IsString()
  @IsOptional()
  priority: Priority;
}
