"use client";
import ThemeToggle from "./ThemeToggle";
import SearchToggle from "./SearchToggle";
import { SidebarNavBtn } from "./SidebarToggle";
import LogoComponent from "./LogoComponent";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { cn } from "fumadocs-ui/components/api";
import { MenuLinks } from "./MobileNavigation";

const Navbar = ({
  menu = "Mobile",
  float = false,
}: {
  menu?: "Sidebar" | "Mobile";
  float?: boolean;
}) => {
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
    <div
      className={`flex flex-col justify-between items-center sticky px-6   border-fd-border z-30 ${
        float
          ? " h-auto rounded-2xl md:rounded-full top-4 w-11/12 mx-auto border backdrop-blur-lg bg-fd-background/50"
          : "top-0 w-full border-b bg-fd-background h-[var(--fd-nav-height)]"
      } `}
    >
      <div className="flex justify-between items-center w-full h-[var(--fd-nav-height)]">
        <div className="flex items-end gap-6">
          <LogoComponent />
          <div className="flex justify-center items-center gap-4 max-md:hidden">
            <MenuLinks socialLinks={false} className="flex-row" itemClassName="" />
          </div>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <SearchToggle />
          <ThemeToggle />
          <Link
            href={"https://x.com/shivay1256"}
            className="p-2 hover:bg-fd-foreground/10 transition-colors rounded-md max-md:hidden"
            target="_blank"
          >
            <FaXTwitter className="h-5 w-5" />
          </Link>
          <Link
            href={"https://github.com/shivaydv/dev-axioms"}
            className="p-2 hover:bg-fd-foreground/10 transition-colors rounded-md max-md:hidden"
            target="_blank"
          >
            <FiGithub className="h-5 w-5" />
          </Link>

          {menu === "Sidebar" ? (
            <SidebarNavBtn />
          ) : (
            <button
              onClick={toggleMenu}
              className={cn("p-2 hover:bg-fd-foreground/10 transition-colors rounded-md md:hidden z-50 relative")}
              type="button"
            >
              {isMenuOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
            </button>
          )}
        </div>
      </div>
      {menu === "Mobile" && (
        <div
          className={`overflow-hidden transition-max-height  duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen border-t" : "max-h-0"
          } w-full   rounded-b-xl`}
        >
          <div className="p-4">
            <MenuLinks
              onItemClick={toggleMenu}
              socialLinks={true}
              className="flex-col"
              itemClassName={cn("p-2 hover:bg-fd-foreground/10 transition-colors rounded-md")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
