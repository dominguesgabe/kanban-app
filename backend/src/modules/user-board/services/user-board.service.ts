import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBoard } from '../entities/user-board.entity';
import { UserBoardsRepository } from '../repositories/user-boards.repository';

@Injectable()
export class UserBoardsService {
  constructor(
    @InjectRepository(UserBoard)
    private userBoardsRepository: UserBoardsRepository,
  ) {}

  // async create(user: User): Promise<User> {
  //   const createdUser = this.usersRepository.create(user);
  //   return createdUser;
  // }

  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  // findOne(id: number): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
