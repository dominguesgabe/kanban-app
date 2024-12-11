import { Board } from 'src/modules/board/entities/board.entity';
import { ColumnItem } from 'src/modules/column-item/entities/column-item.entity';
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

  @OneToMany(() => ColumnItem, (columnItem) => columnItem.column)
  columnItems: ColumnItem[];
}
