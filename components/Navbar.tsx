import React from "react";
import ThemeToggle from "./ThemeToggle";
import SearchToggle from "./SearchToggle";
import { SidebarNavBtn } from "./SidebarToggle";
import LogoComponent from "./LogoComponent";
import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center  px-6 bg-fd-background/50 backdrop-blur-sm  border-b border-fd-border  z-30 sticky top-0   w-full h-[var(--fd-nav-height)] ">
      <LogoComponent />
      <div className="flex gap-1 items-center justify-center">
        <SearchToggle />
        <ThemeToggle />
        <SidebarNavBtn />
        <div className="h-5 w-px bg-fd-foreground/50 mx-1"></div>
        {/* <Link href={"https://x.com/shivay1256"} className="p-2 hover:bg-fd-foreground/10 transition-colors rounded-md" target="_blank">
          <FaXTwitter className="h-5 w-5" />
        </Link> */}
        <Link href={"https://github.com/shivaydv/dev-axioms"} className="p-2 hover:bg-fd-foreground/10 transition-colors rounded-md" target="_blank">
          <FiGithub className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
