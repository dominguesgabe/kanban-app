export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Board {
  id: number;
  name: string;
}

type Priority = "low" | "medium" | "high";

export interface ColumnItem {
  id: number;
  name: string;
  description: string;
  position: number;
  priority: Priority;
}

export interface BoardColumn {
  id: number;
  name: string;
  board: Board;
  columnItems: ColumnItem[];
}
