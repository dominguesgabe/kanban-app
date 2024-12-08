import { Board } from 'src/modules/board/entities/board.entity';
import { UserBoard } from 'src/modules/user-board/entities/user-board.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Board, (board) => board.owner)
  ownedBoards: Board[];

  @OneToMany(() => UserBoard, (userBoard) => userBoard.user, { cascade: true })
  userBoards: UserBoard[];

  @OneToOne(() => Session, (session) => session.user)
  session: Session;
}
