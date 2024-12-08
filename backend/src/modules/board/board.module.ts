import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardsService } from './services/board.service';
import { BoardsController } from './controllers/board.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), AuthModule, UsersModule],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
