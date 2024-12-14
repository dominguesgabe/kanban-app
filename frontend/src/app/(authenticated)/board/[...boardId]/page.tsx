import { KanbanBoard } from "@/src/components";

interface IParams {
  boardId: string[];
}

export default async function BoardPage({ params }: { params: IParams }) {
  const { boardId } = await params;

  return (
    <KanbanBoard boardId={boardId[0]} />
  );
}
