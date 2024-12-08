import { IsNotEmpty } from 'class-validator';

export class CreateSessionDTO {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  code: string;
}
