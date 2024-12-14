import { BoardColumn } from 'src/modules/board-column/entities/board-column.entity';
import { UserBoard } from 'src/modules/user-board/entities/user-board.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.ownedBoards, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner: User;

  @OneToMany(() => UserBoard, (userBoard) => userBoard.board, { cascade: true })
  userBoards: UserBoard[];

  @OneToMany(() => BoardColumn, (boardColumn) => boardColumn.board, {
    cascade: true,
  })
  columns: BoardColumn[];
}
