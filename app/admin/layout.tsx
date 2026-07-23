import { AppSidebar } from "@/components/admin-dashboard/sidebar";
import { ThemeToggle } from "@/components/global/ThemeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserSession } from "@/server/functions/getUserSession";
import { checkIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getUserSession();
  const isAdmin = checkIsAdmin(session);
  if (!isAdmin) redirect("/");

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative flex flex-1 flex-col bg-background min-h-screen">
        <header className="bg-background/80 backdrop-blur-md sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-border/60 px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="h-8 w-8" />
            <div className="h-4 w-px bg-border/60" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Dashboard
            </span>
          </div>
          <ThemeToggle />
        </header>
        <section className="flex-1 overflow-auto p-6 md:p-8">{children}</section>
      </main>
    </SidebarProvider>
  );
}
