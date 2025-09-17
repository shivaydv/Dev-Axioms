import { AppSidebar } from "@/components/admin-dashboard/sidebar";
import { ThemeToggle } from "@/components/global/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex flex-1 flex-col">
        <header className="bg-background sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b px-6">
          <SidebarTrigger className="h-8 w-8" />
          <ThemeToggle />
        </header>
        <section className="flex-1 overflow-auto p-6">{children}</section>
      </main>
    </SidebarProvider>
  );
}
