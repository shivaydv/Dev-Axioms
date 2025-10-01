"use client";
import { Home, List, Package } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Logo } from "../global/Logo";

export type NavItem = {
  title: string;
  icon?: React.ElementType;
  url: string;
  badge?: string;
  children?: never;
};

const NavItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Questions",
    url: "/admin/questions",
    icon: List,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  function isActiveRoute(currentPath: string, itemUrl: string) {
    // Exact match
    if (currentPath === itemUrl) return true;

    // if its nested routes, check if current path starts with itemUrl

    if (currentPath.startsWith(itemUrl) && itemUrl !== "/admin") return true;
    return false;
  }

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="flex h-16 justify-center border-b px-4 py-4">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <SidebarMenu className="space-y-1">
          {NavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "w-full justify-start gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                  isActiveRoute(pathname, item.url) && "bg-primary/10",
                )}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                  {item?.badge && (
                    <Badge variant="default" className="ml-auto h-5 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
