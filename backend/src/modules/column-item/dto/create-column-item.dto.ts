import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Priority } from '../enums';

export class CreateColumnItemDTO {
  @IsNumber()
  @IsNotEmpty()
  columnId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  priority: Priority;
}
