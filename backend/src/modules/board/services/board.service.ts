import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/modules/user/repositories/user.repository';
import { CreateBoardDTO } from '../dto';
import { Board } from '../entities/board.entity';
import { BoardsRepository } from '../repositories/board.repository';

interface CreateProps {
  createBoardDTO: CreateBoardDTO;
  email: string;
}

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: BoardsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async create({ createBoardDTO, email }: CreateProps): Promise<any> {
    const ownerUser = await this.usersRepository.findOneBy({
      email,
    });

    const createdBoard = this.boardsRepository.create({
      ...createBoardDTO,
      owner: ownerUser,
    });

    if (!createdBoard) {
      throw new BadRequestException();
    }

    await this.boardsRepository.save(createdBoard);

    return createdBoard;
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
