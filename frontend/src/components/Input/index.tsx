import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="border border-gray-300 rounded-md p-2 block w-full"
      {...props}
    />
  )
}
