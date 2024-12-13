import { Sidebar } from "@/src/components";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full">
      <Sidebar />
      <main
        className="px-4 flex-1 flex items-center"
      >
        {children}
      </main>
    </div>
  );
}
