import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/user.repository';
import { CreateUserDTO } from '../dto';
import { AuthService } from 'src/modules/auth/services/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
    private authService: AuthService,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersRepository.findOneBy({
      email: userDTO.email,
    });

    if (existingUser) {
      throw new BadRequestException('User email already exists');
    }

    const encryptedPassword = await this.authService.hashPassword(
      userDTO.password,
    );

    const createdUser = this.usersRepository.create({
      ...userDTO,
      password: encryptedPassword,
    });

    await this.usersRepository.save(createdUser);

    const { password, ...createdUserWithoutPassword } = createdUser;

    return createdUserWithoutPassword;
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
}
