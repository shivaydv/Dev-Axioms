"use client";

import { ChevronDown, GithubIcon, Menu, X } from "lucide-react";
import { Logo } from "@/components/global/Logo";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/global/ThemeToggle";
import { FaXTwitter } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import ProfileDropdown from "./ProfileDropdown";

interface NavLink {
  title: string;
  href?: string;
}

export const NAVLINKS: NavLink[] = [
  { title: "Docs", href: "/web-dev/html" },
  { title: "Practice", href: "/practice" },
  { title: "Playgrounds", href: "/playground" },
  { title: "Blogs", href: "/blog" },
  {
    title: "Community",
    href: "https://github.com/shivaydv/Dev-Axioms/discussions",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes (navigation occurs)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-md ${isOpen ? "bg-background/80" : "bg-background"}`}
    >
      <div className="relative mx-auto flex h-16 max-w-[1250px] items-center justify-between px-4 md:px-6">
        {/* Left side - Logo + Desktop Links */}
        <div className="flex items-center gap-6">
          <Logo />
          <div className="hidden items-center gap-5 lg:flex">
            <NavMenu />
          </div>
        </div>

        {/* Right side - icons + mobile menu button */}
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/shivaydv/Dev-Axioms"
            className={`${buttonVariants({ variant: "ghost", size: "icon" })} max-md:hidden`}
          >
            <GithubIcon className="h-[1.2rem] w-[1.2rem]" />
          </Link>
          <Link
            href="https://x.com/shivay1256"
            className={`${buttonVariants({ variant: "ghost", size: "icon" })} max-md:hidden`}
          >
            <FaXTwitter className="h-[1.2rem] w-[1.2rem]" />
          </Link>
          <ThemeToggle />
          <div className="hidden lg:flex">
            <AuthBtns />
          </div>

          {/* Mobile menu button */}
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={toggleMenu}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            <ChevronDown
              className={`h-[1.2rem] w-[1.2rem] ${isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-200`}
            />
          </Button>
        </div>

        {/* Mobile menu dropdown - absolutely positioned */}
        <div
          className={`bg-background border-border absolute top-full right-0 left-0 rounded-b-2xl border-b shadow-md backdrop-blur-md transition-all duration-300 ease-in-out lg:hidden ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
          style={{
            // maxHeight: isOpen ? '500px' : '0',
            overflow: "hidden",
          }}
        >
          <div className="mx-auto max-w-[1250px] px-4 py-4 md:px-6">
            <MobileNavMenu onItemClick={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export function NavMenu() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-5 text-sm font-medium">
      {NAVLINKS.map((item) => {
        const isActive = item.href && pathname.startsWith(item.href);

        return (
          <Link
            key={item.title}
            href={item.href || "#"}
            className={`hover:text-foreground transition-colors ${
              isActive
                ? "text-foreground font-semibold"
                : "text-muted-foreground"
            }`}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}

export function MobileNavMenu({ onItemClick }: { onItemClick: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-1">
      {NAVLINKS.map((item, index) => {
        const isActive = item.href && pathname.startsWith(item.href);

        return (
          <Link
            key={item.title}
            href={item.href || "#"}
            onClick={onItemClick}
            className={`hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-3 text-base font-medium transition-all duration-200 ${
              isActive
                ? "text-foreground bg-accent/50 font-semibold"
                : "text-muted-foreground"
            }`}
            style={{
              animationDelay: `${index * 50}ms`,
              opacity: 0,
              transform: "translateY(10px)",
              animation: `slideInUp 0.3s ease-out ${index * 50}ms forwards`,
            }}
          >
            {item.title}
          </Link>
        );
      })}
      <div className="flex gap-2 py-1 md:hidden">
        <Link
          href="https://github.com/shivaydv/Dev-Axioms"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <GithubIcon className="h-[1.2rem] w-[1.2rem]" />
        </Link>
        <Link
          href="https://x.com/shivay1256"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <FaXTwitter className="h-[1.2rem] w-[1.2rem]" />
        </Link>
        <div className="flex-1" />

        <AuthBtns size="default" />
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

const AuthBtns = ({ size = "sm" }: { size?: "default" | "sm" | "lg" }) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="hidden items-center gap-2 lg:flex">
        <div className="bg-muted h-8 w-16 animate-pulse rounded-md"></div>
      </div>
    );
  }

  const user = {
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "",
  };

  return (
    <div className="items-center gap-2">
      {session ? (
        <ProfileDropdown user={user} />
      ) : (
        <Link
          href="/login"
          className={buttonVariants({ variant: "default", size: size })}
        >
          Sign In
        </Link>
      )}
    </div>
  );
};
