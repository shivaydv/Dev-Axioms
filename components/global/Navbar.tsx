"use client";

import { ChevronDown, GithubIcon } from "lucide-react";
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
  { title: "Docs", href: "/web-dev" },
  { title: "Practice", href: "/practice" },
  { title: "Blogs", href: "/blog" },
  {
    title: "Community",
    href: "https://github.com/shivaydv/Dev-Axioms/discussions",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
      className={`sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur-md ${isOpen ? "bg-background/90" : "bg-background/80"}`}
    >
      <div className="relative mx-auto flex h-16 max-w-page items-center justify-between px-4 md:px-6">
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
            className={`${buttonVariants({ variant: "ghost", size: "icon" })} max-md:hidden h-8 w-8 text-muted-foreground hover:text-foreground`}
          >
            <GithubIcon className="h-4 w-4" />
          </Link>
          <Link
            href="https://x.com/shivay1256"
            className={`${buttonVariants({ variant: "ghost", size: "icon" })} max-md:hidden h-8 w-8 text-muted-foreground hover:text-foreground`}
          >
            <FaXTwitter className="h-4 w-4" />
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
            className="lg:hidden h-8 w-8"
            aria-label="Toggle menu"
          >
            <ChevronDown
              className={`h-4 w-4 ${isOpen ? "rotate-180" : "rotate-0"} transition-transform duration-200`}
            />
          </Button>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={`bg-background/95 border-border/60 absolute top-full right-0 left-0 rounded-b-2xl border-b shadow-md backdrop-blur-md transition-all duration-300 ease-in-out lg:hidden ${isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          style={{
            overflow: "hidden",
          }}
        >
          <div className="mx-auto max-w-page px-4 py-4 md:px-6">
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
            className={`transition-colors ${isActive
                ? "text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
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
            className={`hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-3 text-base font-medium transition-all duration-200 ${isActive
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
      <div className="flex gap-2 pt-2 md:hidden">
        <Link
          href="https://github.com/shivaydv/Dev-Axioms"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <GithubIcon className="h-4 w-4" />
        </Link>
        <Link
          href="https://x.com/shivay1256"
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <FaXTwitter className="h-4 w-4" />
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
    <div className="items-center gap-2 flex">
      {session ? (
        <ProfileDropdown user={user} />
      ) : (
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-lg bg-[#FF5A26] px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#FF5A26]/90 active:scale-95 transition-all"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};
