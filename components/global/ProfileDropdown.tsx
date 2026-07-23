"use client";

import React from "react";
import {
  User,
  Bookmark,
  Heart,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import SignoutBtn from "./SignoutBtn";
import Link from "next/link";

interface ProfileDropdownProps {
  user: {
    name: string | undefined;
    email: string | undefined;
    avatar?: string | undefined;
  };
}

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  const userInitials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "DA";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0 ring-1 ring-border/60 hover:ring-[#FF5A26]/60 transition-all">
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
            <AvatarFallback className="rounded-full bg-[#FF5A26]/10 text-[#FF5A26] font-semibold text-xs">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 rounded-xl border border-border/60 bg-card/95 backdrop-blur-xl p-1.5 shadow-xl select-none"
        align="end"
        sideOffset={6}
      >
        <DropdownMenuLabel className="p-2 font-normal">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-9 w-9 rounded-full border border-border/50">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[#FF5A26]/10 text-[#FF5A26] font-semibold text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="truncate font-semibold text-xs text-foreground leading-tight">
                {user.name || "User"}
              </span>
              <span className="truncate text-[11px] text-muted-foreground leading-tight mt-0.5">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="my-1 bg-border/50" />

        <DropdownMenuGroup className="space-y-0.5">
          <DropdownMenuItem asChild className="group rounded-lg text-xs font-medium cursor-pointer focus:bg-muted focus:text-foreground">
            <Link href="/profile" className="flex w-full items-center gap-2.5 px-2 py-1.5">
              <User className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span>Profile Overview</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="group rounded-lg text-xs font-medium cursor-pointer focus:bg-muted focus:text-foreground">
            <Link href="/profile/liked" className="flex w-full items-center gap-2.5 px-2 py-1.5">
              <Heart className="h-3.5 w-3.5 text-muted-foreground group-hover:text-[#FF5A26] transition-colors" />
              <span>Liked Questions</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="group rounded-lg text-xs font-medium cursor-pointer focus:bg-muted focus:text-foreground">
            <Link href="/profile/bookmarks" className="flex w-full items-center gap-2.5 px-2 py-1.5">
              <Bookmark className="h-3.5 w-3.5 text-muted-foreground group-hover:text-[#FF5A26] transition-colors" />
              <span>Bookmarked Questions</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-1 bg-border/50" />

        <div className="p-0.5">
          <SignoutBtn className="w-full justify-start h-8 text-xs font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg px-2" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
