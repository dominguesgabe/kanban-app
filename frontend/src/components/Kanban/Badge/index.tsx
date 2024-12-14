import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold text-white",
  {
    variants: {
      variant: {
        low:
          "bg-lime-400",
        medium:
          "bg-yellow-400",
        high:
          "bg-red-500",
      },
    },
    defaultVariants: {
      variant: "low",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className="w-full flex justify-end p-2 font-semibold">
      <div className={cn(badgeVariants({ variant }), className)} {...props} />
    </div>
  )
}

export { Badge, badgeVariants }
