"use client";
import ThemeToggle from "./ThemeToggle";
import SearchToggle from "./SearchToggle";
import { SidebarNavBtn } from "./SidebarToggle";
import LogoComponent from "./LogoComponent";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import MobileNavigation, { MenuLinks } from "./MobileNavigation";

const Navbar = ({ menu = "Mobile" }: { menu?: "Sidebar" | "Mobile" }) => {
  return (
    <>
      <div className="flex justify-between items-center  px-6 bg-fd-background/50 backdrop-blur-sm border-b border-fd-border z-30 sticky top-0 w-full h-[var(--fd-nav-height)]">
        <div className="flex items-end gap-6 ">
          <LogoComponent />
          <div className=" flex justify-center items-center gap-4 max-md:hidden">
            <MenuLinks socialLinks={false} className="flex-row " itemClassName="" />
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

          {menu === "Sidebar" ? <SidebarNavBtn /> : <MobileNavigation />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
