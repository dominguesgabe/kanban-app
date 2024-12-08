import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/modules/user/repositories/user.repository';
import { CreateBoardDTO } from '../dto';
import { Board } from '../entities/board.entity';
import { BoardsRepository } from '../repositories/board.repository';
import { User } from 'src/modules/user/entities/user.entity';
import { UserBoard } from 'src/modules/user-board/entities/user-board.entity';
import { UserBoardsRepository } from 'src/modules/user-board/repositories/user-boards.repository';

interface CreateProps {
  createBoardDTO: CreateBoardDTO;
  email: string;
}

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: BoardsRepository,
    @InjectRepository(User)
    private usersRepository: UsersRepository,
    @InjectRepository(UserBoard)
    private userBoardsRepository: UserBoardsRepository,
  ) {}

  async create({ createBoardDTO, email }: CreateProps): Promise<any> {
    const ownerUser = await this.usersRepository.findOneBy({
      email,
    });

    const board = this.boardsRepository.create({
      ...createBoardDTO,
      owner: ownerUser,
    });

    if (!board) {
      throw new BadRequestException();
    }

    await this.boardsRepository.save(board);

    const userBoard = this.userBoardsRepository.create({
      user: ownerUser,
      board,
      permission: 'owner',
    });

    if (!userBoard) {
      throw new BadRequestException();
    }

    await this.userBoardsRepository.save(userBoard);

    return board;
  }

  findAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  findOne(id: number): Promise<Board | null> {
    return this.boardsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.boardsRepository.delete(id);
  }
}
