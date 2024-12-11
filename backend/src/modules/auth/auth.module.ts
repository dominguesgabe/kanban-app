import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SessionRepository } from '../session/repositories/session.repository';
import { SessionModule } from '../session/session.module';
import { UsersModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

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
