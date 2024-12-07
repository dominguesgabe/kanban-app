import { Board } from 'src/modules/board/entities/board.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
