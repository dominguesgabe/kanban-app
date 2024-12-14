"use client"

import { useDndContext } from "@dnd-kit/core";
import { cva } from "class-variance-authority";
import { ReactNode } from "react";

export function BoardContainer({ children }: { children: ReactNode }) {
  const dndContext = useDndContext()

  const variations = cva("overflow-x-auto px-2 md:px-0 flex justify-center", {
    variants: {
      dragging: {
        default: "snap-x snap-mandatory",
        active: "snap-none",
      },
    },
  })

  return (
    <div
      className={variations({
        dragging: dndContext.active ? "active" : "default",
      })}
    >
      <div className="flex gap-4 items-center flex-row justify-center">
        {children}
      </div>
    </div>
  )
}
