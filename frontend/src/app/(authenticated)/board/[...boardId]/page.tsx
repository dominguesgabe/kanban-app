import { KanbanBoard } from "@/src/components";
import { cookies } from "next/headers";

interface IParams {
  boardId: string[];
}

export default async function BoardPage({ params }: { params: IParams }) {
  const { boardId } = await params;
  const requestCookies = await cookies();

  return (

    <KanbanBoard boardId={boardId} />
  );
}
