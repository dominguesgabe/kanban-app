import { BoardColumn } from 'src/modules/board-column/entities/board-column.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Priority } from '../enums';

@Entity()
export class ColumnItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  position: number;

  @Column({
    type: 'text',
    default: Priority.MEDIUM,
  })
  priority: Priority;

  @ManyToOne(() => BoardColumn, (boardColumn) => boardColumn.tasks)
  column: BoardColumn;
}
