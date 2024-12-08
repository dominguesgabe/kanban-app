import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionRepository } from '../session/repositories/session.repository';
import { UsersController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repository';
import { UsersService } from './services/user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UsersService, UsersRepository, SessionRepository],
  controllers: [UsersController],
  exports: [UsersRepository],
})
export class UsersModule {}
