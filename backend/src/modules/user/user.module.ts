import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/user.service';
import { UsersController } from './controllers/user.controller';
import { AuthService } from '../auth/services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService],
  controllers: [UsersController],
})
export class UsersModule {}
