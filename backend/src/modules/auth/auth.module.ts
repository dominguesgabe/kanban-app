import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../user/user.module';
import { SessionModule } from '../session/session.module';
import { SessionRepository } from '../session/repositories/session.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    SessionModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, SessionRepository],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
