"use client"

import { BoardColumn as IBoardColumn, ColumnDragData, ColumnTask } from "@/src/types";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripVertical } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../../Button";
import { Task, TaskContent, TaskHeader } from "../Task";
import { TaskCard } from "../TaskCard";

interface BoardColumnProps {
  column: IBoardColumn;
  tasks: ColumnTask[];
  isOverlay?: boolean;
}

export function BoardColumn({ column, tasks, isOverlay }: BoardColumnProps) {
  const tasksIds = useMemo(() => (tasks.map(task => task.id)), [tasks])

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `column-${column.id}`,
    data: { type: "column", column } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column ${column.name}`,
    }
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva(
    "h-full max-h-[80vh] w-[350px] max-w-full bg-gray-50 flex flex-col flex-shrink-0 snap-center",
    {
      variants: {
        dragging: {
          default: "border-2 border-transparent",
          over: "ring-2 opacity-30",
          overlay: "ring-2 ring-primary",
        },
      },
    }
  )

  return (
    <Task
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <TaskHeader
        className="p-4 font-semibold rounded-t-lg bg-cyan-400 text-white border border-b-2 text-left flex flex-row justify-between items-center"
      >
        <span>{column.name}</span>
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className=" p-1 text-white -ml-2 h-auto cursor-grab relative"
        >
          <GripVertical />
        </Button>
      </TaskHeader>

      <TaskContent className="flex flex-grow flex-col gap-4 p-2 overflow-y-auto overflow-x-hidden">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))}
        </SortableContext>
      </TaskContent>
    </Task>
  )
}
