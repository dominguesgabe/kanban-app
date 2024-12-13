import { Sidebar } from "@/src/components";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 min-h-full">
      <Sidebar />
      <main
        className="mx-4 flex-1 flex items-center"
      >
        {children}
      </main>
    </div>
  );
}
