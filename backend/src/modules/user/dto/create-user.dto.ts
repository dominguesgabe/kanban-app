import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  //encrypt it for god sake
  @IsString()
  @IsNotEmpty()
  password: string;
}
