import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const createdUser = this.usersRepository.create(userDTO);
    await this.usersRepository.save(createdUser);
    return createdUser;
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
}
