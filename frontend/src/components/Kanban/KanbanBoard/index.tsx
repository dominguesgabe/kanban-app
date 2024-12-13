"use client"

import { useKanban } from "@/src/internals/hooks/useKanban";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { BoardColumn } from "../BoardColumn";
import { BoardContainer } from "../BoardContainer";
import { TaskCard } from "../TaskCard";

export function KanbanBoard() {
  const {
    columns,
    columnsId,
    activeColumn,
    activeTask,
    sensors,
    onDragStart,
    onDragEnd,
    onDragOver,
    tasks,
  } = useKanban()

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {
            columns.map((column) => (
              <BoardColumn
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.columnId === column.id)}
              />
            ))
          }
        </SortableContext>
      </BoardContainer>

      {
        "document" in window && (
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <BoardColumn
                  isOverlay
                  column={activeColumn}
                  tasks={tasks.filter(
                    (task) => task.columnId === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <TaskCard task={activeTask} isOverlay />
              )}
            </DragOverlay>,
            document.body
          )
        )
      }
    </DndContext>
  )
}
