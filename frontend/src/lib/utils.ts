import { UniqueIdentifier } from "@dnd-kit/core";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeIdPrefix(string: UniqueIdentifier): number {
  const stringId = string as string;
  const id = stringId.split("-")[1];
  return Number(id);
}
