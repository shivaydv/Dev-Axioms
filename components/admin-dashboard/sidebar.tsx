"use client";
import { Home, Package } from "lucide-react";
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
    title: "Add Question",
    url: "/admin/add-question",
    icon: Package,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

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
                  pathname === item.url && "bg-primary/10",
                )}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                  {item?.badge && (
                    <Badge variant="default" className="ml-auto h-5 text-xs">
                      {item?.badge}
                    </Badge>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.image || "/placeholders/avatar.svg"}
              alt={user?.name}
            />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium">{user?.name}</span>
            <span className="text-muted-foreground truncate text-sm">
              {user?.email}
            </span>
          </div>
        </div>
      </SidebarFooter> */}
    </Sidebar>
  );
}
