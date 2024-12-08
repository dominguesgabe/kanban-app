import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entities/session.entity';
import { SessionRepository } from '../repositories/session.repository';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: SessionRepository,
  ) {}
}
