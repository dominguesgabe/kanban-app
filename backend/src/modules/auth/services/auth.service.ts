import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from 'src/modules/user/repositories/user.repository';
import { LoginDTO } from '../dto';
import { SessionRepository } from 'src/modules/session/repositories/session.repository';
import { uuid } from 'src/modules/utils/uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly jwtService: JwtService,
  ) {}
  private readonly saltRounds = 8;

  async login({ email, password }: LoginDTO): Promise<any> {
    //change any

    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Email not registered');
    }

    const isValidPassword = await this.comparePassword(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const session = await this.sessionRepository.findByEmail(email);

    const token = uuid();

    if (!session) {
      const session = this.sessionRepository.create({
        user: user,
        code: token,
      });

      await this.sessionRepository.save(session);
    } else {
      await this.sessionRepository.update(session.id, {
        code: token,
      });
    }

    const tokenJwt = await this.jwtService.sign({ email, token, sub: user.id });

    return {
      accessToken: tokenJwt,
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

  async validateSession(username: string, code: string): Promise<boolean> {
    const session = await this.sessionRepository.findOne({
      where: { user: { email: username.toLowerCase() } },
      relations: ['user'],
    });

    if (!session) {
      return true;
    }

    if (session.code !== code) {
      return false;
    }

    return true;
  }
}
