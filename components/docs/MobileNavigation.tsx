"use client";
import Link from "next/dist/client/link";
import { FiGithub } from "react-icons/fi";
import { useState, useEffect } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import { useSidebar } from "fumadocs-ui/provider";
import { cn } from "fumadocs-ui/components/api";


export const MenuLinks = ({
  className = "",
  itemClassName = "",
  onItemClick,
  socialLinks = true,
}: {
  className?: string;
  itemClassName?: string;
  onItemClick?: () => void;
  socialLinks?: boolean;
}) => {

  const { setOpen, open } = useSidebar();
  return (
    <div className={cn("flex gap-4", className)}>
      <Link
        href={"/"}
        className={cn(itemClassName)}
        onClick={onItemClick}
      >
        Home
      </Link>
      <Link
        href={"/docs"}
        className={cn(itemClassName)}
        onClick={() => {
          onItemClick?.();
          setOpen(false);
        }}
      >
        Docs
      </Link>
      <Link
        href={"/playground"}
        className={cn(itemClassName)}
        onClick={onItemClick}
      >
        Playground
      </Link>
      {socialLinks && (
        <div className="flex gap-4 p-2">
          <Link
            href={"https://x.com/shivay1256"}
            className={cn("hover:bg-fd-foreground/10 transition-colors rounded-md p-2")}
            target="_blank"
          >
            <FaXTwitter className="h-5 w-5" />
          </Link>
          <Link
            href={"https://github.com/shivaydv/dev-axioms"}
            className={cn("hover:bg-fd-foreground/10 transition-colors rounded-md p-2")}
            target="_blank"
          >
            <FiGithub className="h-5 w-5" />
          </Link>
        </div>
      )}
    </div>
  );
};

const MobileNavigation = ({ socialLinks = true }: { socialLinks?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <button
        onClick={toggleMenu}
        className={cn("p-2 hover:bg-fd-foreground/10 transition-colors rounded-md md:hidden")}
        type="button"
      >
        {isMenuOpen ? (
          <HiX className="h-5 w-5" />
        ) : (
          <HiMenu className="h-5 w-5" />
        )}
      </button>
      <div className="md:hidden overflow-hidden absolute top-[var(--fd-nav-height)] left-0 w-full">
        <div
          className={cn(
            "w-full bg-fd-background border-b border-fd-border transform transition-transform duration-300",
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="p-4">
            <MenuLinks onItemClick={toggleMenu} socialLinks={socialLinks} className="flex-col" itemClassName={cn("p-2 hover:bg-fd-foreground/10 transition-colors rounded-md")} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
