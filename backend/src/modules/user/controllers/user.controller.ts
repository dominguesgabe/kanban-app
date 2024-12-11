import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { CreateUserDTO } from '../dto';
import { User } from '../entities/user.entity';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findById(@Param() { id }: { id: number }): Promise<User | null> {
    return this.usersService.findById(id);
  }
}
