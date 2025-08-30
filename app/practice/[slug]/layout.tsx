import { SidebarProvider } from "@/store/PlaygroundSidebarContext";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  );
}
