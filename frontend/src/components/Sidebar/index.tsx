"use client"

import { api } from "@/src/internals/adapters/api";
import { ApiRoute, Board, Route } from "@/src/internals/enums";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const boardId = Number(pathname.split("/").pop())

  const {
    data: boards,
  } = useQuery<Board[]>({
    queryKey: ["boards"],
    queryFn: async () => {
      const { data } = await api.get<Board[]>(ApiRoute.boards)
      return data
    },
  })

  const {
    mutate: createBoard,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await api.post<Board>(ApiRoute.boards, {
        name: "New board",
      })
      return data
    },
    onSuccess: (data) => queryClient.setQueryData<Board[]>(["boards"], (prevBoards) => {
      return prevBoards ? [...prevBoards, data] : [data];
    }),
  })

  return (
    <aside
      className="bg-gray-100 w-1/5 min-w-[20%] h-screen flex flex-col gap-4 p-4"
    >
      <Image
        src={"/logo.png"}
        alt="Kanban logo"
        width={80}
        height={80}
        priority
      />
      <button
        onClick={() => createBoard()}
        className="bg-cyan-400 hover:bg-cyan-300 transition text-white rounded-lg font-semibold flex gap-4 p-3 justify-center items-center"
      >
        New board

        <PlusCircle className="text-white" />
      </button>
      <menu
        className="flex flex-col gap-1"
      >
        {
          boards?.map((board) => (
            <Link
              key={board.id}
              href={`${Route.board}/${board.id}`}
            >
              <li
                data-selected={boardId === board.id}
                className="p-2 hover:bg-gray-50 transition rounded-lg data-[selected=true]:bg-gray-200 data-[selected=true]:font-semibold"
              >
                {board.name}
              </li>
            </Link>
          ))
        }
      </menu>
    </aside>
  )
}
