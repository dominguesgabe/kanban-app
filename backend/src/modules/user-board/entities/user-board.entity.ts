import { Board } from 'src/modules/board/entities/board.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserBoard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userBoards, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Board, (board) => board.userBoards, { onDelete: 'CASCADE' })
  board: Board;

  //It was not possible to use enum due to sqlite limitations
  @Column()
  permission: string;
}
