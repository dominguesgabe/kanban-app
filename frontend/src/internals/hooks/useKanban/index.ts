import { Column, DraggableData, ITask } from "@/src/types";
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

const defaultCols = [
  {
    id: "todo" as const,
    title: "Todo",
  },
  {
    id: "in-progress" as const,
    title: "In progress",
  },
  {
    id: "done" as const,
    title: "Done",
  },
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]["id"];

const exampleTasks: ITask[] = [
  {
    id: "task1",
    columnId: "done",
    content: "Project initiation and planning",
  },
  {
    id: "task2",
    columnId: "done",
    content: "Gather requirements from stakeholders",
  },
  {
    id: "task3",
    columnId: "done",
    content: "Create wireframes and mockups",
  },
  {
    id: "task4",
    columnId: "in-progress",
    content: "Develop homepage layout",
  },
  {
    id: "task5",
    columnId: "in-progress",
    content: "Design color scheme and typography",
  },
  {
    id: "task6",
    columnId: "todo",
    content: "Implement user authentication",
  },
  {
    id: "task7",
    columnId: "todo",
    content: "Build contact us page",
  },
  {
    id: "task8",
    columnId: "todo",
    content: "Create product catalog",
  },
  {
    id: "task9",
    columnId: "todo",
    content: "Develop about us page",
  },
  {
    id: "task10",
    columnId: "todo",
    content: "Optimize website for mobile devices",
  },
  {
    id: "task11",
    columnId: "todo",
    content: "Integrate payment gateway",
  },
  {
    id: "task12",
    columnId: "todo",
    content: "Perform testing and bug fixing",
  },
  {
    id: "task13",
    columnId: "todo",
    content: "Launch website and deploy to server",
  },
];

export const useKanban = () => {
  const [columns, setColumns] = useState<Column[]>(() => defaultCols);
  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const [tasks, setTasks] = useState<ITask[]>(() => exampleTasks);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

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

    // moved item
    const activeData = active.data.current;

    const activeId = active.id;
    const overId = over.id;

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

    const activeId = active.id;
    const overId = over.id;

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

        return arrayMove(prevTasks, activeTaskIndex, overTaskIndex);
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
          activeTask.columnId = overId as ColumnId;
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
  };
};
