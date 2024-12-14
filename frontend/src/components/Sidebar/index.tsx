"use client"

import { api } from "@/src/internals/adapters/api";
import { ApiRoute, Route } from "@/src/internals/enums";
import { useToast } from "@/src/internals/hooks";
import { Board } from "@/src/types/KanbanBoard/create-board";
import { AxiosError } from "axios";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function Sidebar() {
  const { toast } = useToast()
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

  async function mutationFn() {
    const { data } = await api.post<Board>(ApiRoute.boards, {
      name: "New board",
    })
    return data
  }

  const {
    mutate: handleCreateBoard,
  } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.setQueryData<Board[]>(["boards"], (prevBoards) => {
        return prevBoards ? [...prevBoards, data] : [data];
      });
    },
    onError: (error: AxiosError) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

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
        onClick={() => handleCreateBoard()}
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
