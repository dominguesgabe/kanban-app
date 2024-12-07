import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { CreateUserDTO } from '../dto';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findById(@Param() { id }: { id: number }): Promise<User | null> {
    return this.usersService.findById(id);
  }
}
