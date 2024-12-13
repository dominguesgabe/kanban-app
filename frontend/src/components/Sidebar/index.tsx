import Image from "next/image";

export function Sidebar() {
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
      <menu>
        <li>test</li>
      </menu>
    </aside>
  )
}
