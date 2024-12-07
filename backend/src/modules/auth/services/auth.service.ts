import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from 'src/modules/user/repositories/user.repository';
import { LoginDTO } from '../dto';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  private readonly saltRounds = 8;

  async login({ email, password }: LoginDTO): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Email not registered');
    }

    const isValidPassword = await this.comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    await this.usersRepository.update(user.id, { is_logged: true });

    return {
      ...user,
      is_logged: true,
    };
  }

  async logout() {
    return 'should logout';
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
