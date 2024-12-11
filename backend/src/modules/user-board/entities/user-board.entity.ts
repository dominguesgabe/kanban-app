import { Board } from 'src/modules/board/entities/board.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userBoards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Board, (board) => board.userBoards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  //change to enum
  @Column()
  permission: string;
}
