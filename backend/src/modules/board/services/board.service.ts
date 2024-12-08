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
  userId: number;
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

  async create({ createBoardDTO, userId }: CreateProps): Promise<any> {
    const ownerUser = await this.usersRepository.findOneBy({
      id: userId,
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

  async findAll(userId: number): Promise<UserBoard[]> {
    //try again to move this query to userBoards repository
    const boards = await this.userBoardsRepository
      .createQueryBuilder('user_board')
      .leftJoinAndMapOne(
        'user_board.board',
        'board',
        'board',
        'board.id = user_board.boardId',
      )
      .where('user_board.userId = :userId', { userId })
      .getMany();

    return boards;
  }

  findOne(id: number): Promise<Board | null> {
    return this.boardsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.boardsRepository.delete(id);
  }
}
