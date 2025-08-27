"use client";

import { GithubIcon } from "lucide-react";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import React from "react";
import { ModeToggle } from "@/components/ThemeToggle";
import { FaXTwitter } from "react-icons/fa6";

interface NavLink {
  title: string;
  href?: string;
  component?: React.ReactNode;
}

export const NAVLINKS: NavLink[] = [
  {
    title: "Docs",
    href: "/web-dev/html",
  },
  {
    title: "Practice",
    href: "/practice",
  },
  {
    title: "Playgrounds",
    href: "/playground",
  },
  {
    title: "Blogs",
    href: "/blog",
  },
  {
    title: "Community",
    href: "https://github.com/shivaydv/Dev-Axioms/discussions",
  },
];

export function Navbar() {
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50  bg-fd-background ">
      <div className=" mx-auto max-w-[1250px]  h-full flex items-center justify-between md:gap-2 px-4 md:px-2 ">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-6">
            <div className="flex">
              <Logo />
            </div>
            <div className="lg:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex ml-2.5 sm:ml-0">
              <Link
                href="https://github.com/shivaydv/Dev-Axioms"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <GithubIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <Link
                href="https://x.com/shivay1256"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <FaXTwitter className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function NavMenu() {
  return (
    <div className="flex  w-full gap-3 ">
      {NAVLINKS.map((item) => {
        return (
          <Link
            key={item.title + (item.href || "")}
            className="text-sm text-muted-foreground"
            href={item.href || "#"}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
