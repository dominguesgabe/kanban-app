import { Board } from 'src/modules/board/entities/board.entity';
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
export class BoardColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Board, (board) => board.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  board: Board;
}
