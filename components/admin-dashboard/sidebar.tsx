"use client";

import { LayoutDashboard, FileCode2, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Logo } from "../global/Logo";

export function AppSidebar() {
  const pathname = usePathname();

  function isActiveRoute(currentPath: string, itemUrl: string) {
    if (currentPath === itemUrl) return true;
    if (currentPath.startsWith(itemUrl) && itemUrl !== "/admin") return true;
    return false;
  }

  return (
    <Sidebar className="border-r border-border/50 bg-background/80 backdrop-blur-xl select-none">
      {/* Minimal Left-Aligned Text Header */}
      <SidebarHeader className="flex items-start px-4 justify-center h-14 border-b border-border/40">
       <Logo/>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 space-y-5">
        {/* Overview Group */}
        <SidebarGroup className="p-0 space-y-1">
          <SidebarGroupLabel className="px-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "w-full justify-start gap-3 rounded-lg px-2.5 py-2 text-xs font-semibold transition-all",
                    isActiveRoute(pathname, "/admin")
                      ? "bg-[#FF5A26]/10 text-[#FF5A26] font-bold"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <Link href="/admin">
                    <LayoutDashboard className={cn("h-4 w-4 shrink-0", isActiveRoute(pathname, "/admin") ? "text-[#FF5A26]" : "text-muted-foreground")} />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management Group */}
        <SidebarGroup className="p-0 space-y-1">
          <SidebarGroupLabel className="px-2 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "w-full justify-start gap-3 rounded-lg px-2.5 py-2 text-xs font-semibold transition-all",
                    isActiveRoute(pathname, "/admin/questions")
                      ? "bg-[#FF5A26]/10 text-[#FF5A26] font-bold"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <Link href="/admin/questions">
                    <FileCode2 className={cn("h-4 w-4 shrink-0", isActiveRoute(pathname, "/admin/questions") ? "text-[#FF5A26]" : "text-muted-foreground")} />
                    <span>Questions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "w-full justify-start gap-3 rounded-lg px-2.5 py-2 text-xs font-semibold transition-all",
                    isActiveRoute(pathname, "/admin/users")
                      ? "bg-[#FF5A26]/10 text-[#FF5A26] font-bold"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  <Link href="/admin/users">
                    <Users className={cn("h-4 w-4 shrink-0", isActiveRoute(pathname, "/admin/users") ? "text-[#FF5A26]" : "text-muted-foreground")} />
                    <span>Users & Activity</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
