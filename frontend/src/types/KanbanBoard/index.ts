import { ColumnId } from "@/src/components";
import { type UniqueIdentifier } from "@dnd-kit/core";

// column types

export interface Column {
  id: UniqueIdentifier;
  title: string;
}

export type ColumnType = "column";

export interface ColumnDragData {
  type: ColumnType;
  column: Column;
}

// task types

export interface ITask {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
}

export interface TaskCardProps {
  task: ITask;
  isOverlay?: boolean;
}

export type TaskType = "task";

export interface TaskDragData {
  type: TaskType;
  task: ITask;
}

// hasDraggableData types

export type DraggableData = ColumnDragData | TaskDragData;
