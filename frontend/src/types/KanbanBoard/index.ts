import { type UniqueIdentifier } from "@dnd-kit/core";

export type ColumnType = "column";
export type TaskType = "task";

export interface ColumnDragData {
  type: ColumnType;
  column: BoardColumn;
}

// task types

export interface TaskDragData {
  type: TaskType;
  task: ColumnTask;
}

export type DraggableData = ColumnDragData | TaskDragData;

export interface User {
  id: number;
  name: string;
  email: string;
}

export type Permission = "owner" | "editor" | "member";

export type Priority = "low" | "medium" | "high";

export interface UserBoard {
  user: User;
  permission: Permission;
}

export interface BoardColumn {
  id: UniqueIdentifier;
  name: string;
}

export interface ColumnTask {
  id: number;
  name: string;
  description: string;
  position: number;
  priority: Priority;
  columnId: UniqueIdentifier;
}

export interface Board {
  id: number;
  name: string;
  columns: BoardColumn[];
  tasks: ColumnTask[];
  useBoards: UserBoard[];
}
