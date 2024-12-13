"use client"

import { TaskCardProps, TaskDragData } from "@/src/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { Task, TaskContent, TaskHeader } from "../Task";
import { Button } from "../../Button";
import { GripVertical } from "lucide-react";
import { Badge } from "../Badge";

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Task
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <TaskHeader className="px-3 py-3 flex items-center justify-between flex-row border-b-2 border-secondary relative">
        <span className="font-semibold">
          Task title
        </span>
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
        >
          <GripVertical />
        </Button>
      </TaskHeader>
      <TaskContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
        {task.content}
      </TaskContent>
      <Badge variant={"high"}>
        Medium
      </Badge>
    </Task>
  );
}
