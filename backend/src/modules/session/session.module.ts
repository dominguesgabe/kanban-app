import { Module } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './controllers/session.controller';
import { Session } from './entities/session.entity';
import { SessionRepository } from './repositories/session.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionService, SessionRepository],
  controllers: [SessionController],
  exports: [SessionRepository],
})
export class SessionModule {}
