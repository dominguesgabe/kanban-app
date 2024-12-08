import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/modules/user/repositories/user.repository';
import { CreateBoardDTO } from '../dto';
import { Board } from '../entities/board.entity';
import { BoardsRepository } from '../repositories/board.repository';
import { User } from 'src/modules/user/entities/user.entity';
import { UserBoard } from 'src/modules/user-board/entities/user-board.entity';
import { UserBoardsRepository } from 'src/modules/user-board/repositories/user-boards.repository';
import { UpdateBoardDTO } from '../dto/update-board.dto';

interface CreateProps {
  createBoardDTO: CreateBoardDTO;
  userId: number;
}

interface FindByIdProps {
  boardId: number;
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

  async findAll(userId: number): Promise<Board[]> {
    //try again to move this query to userBoards repository
    const boards = await this.boardsRepository
      .createQueryBuilder('board')
      .innerJoin('board.userBoards', 'user_board')
      .where('user_board.userId = :userId', { userId })
      .getMany();

    return boards;
  }

  async findByIdAndValidateUser({
    boardId,
    userId,
  }: FindByIdProps): Promise<Board> {
    const board = await this.boardsRepository.findOne({
      where: { id: boardId },
      relations: ['userBoards', 'userBoards.user'],
    });

    const allowedBoard = board.userBoards.filter(
      (userBoard) => userBoard.user.id === userId,
    );

    if (!allowedBoard.length) {
      throw new UnauthorizedException(
        'You do not have permission to access this board',
      );
    }

    return {
      ...board,
      userBoards: allowedBoard,
    };
  }

  async delete(id: number): Promise<void> {
    //validate if user can delete board
    await this.boardsRepository.delete({ id });
  }

  async update(id: number, updateBoardDTO: UpdateBoardDTO): Promise<Board> {
    //validate if user can delete board
    const board = await this.boardsRepository.findOne({
      where: { id },
    });

    const updatedBoard = {
      ...board,
      ...updateBoardDTO,
    };

    await this.boardsRepository.update(id, updatedBoard);

    return updatedBoard;
  }
}
