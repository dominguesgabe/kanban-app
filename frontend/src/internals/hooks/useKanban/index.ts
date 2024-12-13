import { DraggableData } from "@/src/types";
import {
  Active,
  DataRef,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  Over,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { api } from "../../adapters/api";
import { ApiRoute } from "../../enums";
import { useToast } from "../useToast";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Board, BoardColumn, ColumnTask } from "@/src/types/KanbanBoard";
import { removeIdPrefix } from "@/src/lib/utils";

const exampleTasks: ColumnTask[] = [
  {
    id: 1,
    position: 1,
    columnId: "done",
    description: "Project initiation and planning",
    name: "task1",
    priority: "low",
  },
  {
    id: 2,
    position: 2,
    columnId: "done",
    description: "Gather requirements from stakeholders",
    name: "task2",
    priority: "medium",
  },
  {
    id: 3,
    position: 3,
    columnId: "done",
    description: "Create wireframes and mockups",
    name: "task3",
    priority: "medium",
  },
  {
    id: 4,
    position: 1,
    columnId: "in-progress",
    description: "Develop homepage layout",
    name: "task4",
    priority: "high",
  },
  {
    id: 5,
    position: 2,
    columnId: "in-progress",
    description: "Design color scheme and typography",
    name: "task5",
    priority: "high",
  },
  {
    id: 6,
    position: 1,
    columnId: "todo",
    description: "Implement user authentication",
    name: "task6",
    priority: "low",
  },
  {
    id: 7,
    position: 2,
    columnId: "todo",
    description: "Build contact us page",
    name: "task7",
    priority: "low",
  },
  {
    columnId: "todo",
    id: 8,
    name: "task8",
    priority: "low",
    position: 3,
    description: "Create product catalog",
  },
];

const defaultCols = [
  {
    id: "todo" as const,
    name: "Todo",
  },
  {
    id: "in-progress" as const,
    name: "In progress",
  },
  {
    id: "done" as const,
    name: "Done",
  },
] satisfies BoardColumn[];

export type ColumnId = (typeof defaultCols)[number]["id"];

async function getBoard(boardId: string) {
  const { data } = await api.get<Board>(`${ApiRoute.boards}/${boardId}`);
  return data;
}

export const useKanban = ({ boardId }: { boardId: string }) => {
  const { toast } = useToast();

  const [columns, setColumns] = useState<BoardColumn[]>(() => defaultCols);
  const [tasks, setTasks] = useState<ColumnTask[]>(() => exampleTasks);

  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const [activeColumn, setActiveColumn] = useState<BoardColumn | null>(null);
  const [activeTask, setActiveTask] = useState<ColumnTask | null>(null);

  const { data: board } = useQuery({
    queryKey: ["board", boardId],
    queryFn: () => getBoard(boardId),
    onSuccess: (data: Board) => {
      setColumns(data.columns);
      setTasks(data.tasks);
    },
    onError: (error: AxiosError) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function hasDraggableData<T extends Active | Over>(
    entry: T | null | undefined
  ): entry is T & {
    data: DataRef<DraggableData>;
  } {
    if (!entry) {
      return false;
    }

    const data = entry.data.current;

    if (data?.type === "task" || data?.type === "column") {
      return true;
    }

    return false;
  }

  function onDragStart(event: DragStartEvent) {
    if (!hasDraggableData(event.active)) return;

    const data = event.active.data.current;

    if (data?.type === "column") {
      setActiveColumn(data.column);
      return;
    }

    if (data?.type === "task") {
      setActiveTask(data.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) return;

    if (!hasDraggableData(active)) return;

    // moved column
    const activeData = active.data.current;

    const activeId = removeIdPrefix(active.id);
    const overId = removeIdPrefix(over.id);

    if (activeId === overId) return;

    const isActiveAColumn = activeData?.type === "column";
    if (!isActiveAColumn) return;

    setColumns((prevColumns) => {
      const activeColumnIndex = prevColumns.findIndex(
        (col) => col.id === activeId
      );
      const overColumnIndex = prevColumns.findIndex((col) => col.id === overId);

      return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = removeIdPrefix(active.id);
    const overId = removeIdPrefix(over.id);

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "task";
    const isOverATask = overData?.type === "task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((prevTasks) => {
        const activeTaskIndex = prevTasks.findIndex(
          (task) => task.id === activeId
        );
        const overTaskIndex = prevTasks.findIndex((task) => task.id === overId);

        const activeTask = tasks[activeTaskIndex];
        const overTask = tasks[overTaskIndex];

        if (
          activeTask &&
          overTask &&
          activeTask.columnId !== overTask.columnId
        ) {
          //activeTask will be placed on the overTask column one position before the overTask
          activeTask.columnId = overTask.columnId;
          return arrayMove(prevTasks, activeTaskIndex, overTaskIndex - 1);
        }

        const movedTaskToSameCol = arrayMove(
          prevTasks,
          activeTaskIndex,
          overTaskIndex
        );
        console.log("movedTaskToSameCol: ", movedTaskToSameCol);
        return movedTaskToSameCol;
      });
    }

    const isOverAColumn = overData?.type === "column";

    if (isActiveATask && isOverAColumn) {
      setTasks((prevTasks) => {
        const activeTaskIndex = prevTasks.findIndex(
          (task) => task.id === activeId
        );

        const activeTask = tasks[activeTaskIndex];

        if (activeTask) {
          activeTask.columnId = overId;
          return arrayMove(prevTasks, activeTaskIndex, activeTaskIndex);
        }

        return prevTasks;
      });
    }
  }

  return {
    columns,
    columnsId,
    activeColumn,
    activeTask,
    sensors,
    onDragStart,
    onDragEnd,
    onDragOver,
    tasks,
    board,
  };
};
