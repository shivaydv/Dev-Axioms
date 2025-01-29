"use client";

import { ModeToggle } from "@/components/docs/theme-toggle";
import {
  GithubIcon,
  TwitterIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Search from "@/components/docs/search";
import Anchor from "@/components/docs/anchor";
import { SheetLeftbar } from "@/components/docs/leftbar";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavSubItem {
  title: string;
  href?: string;
  items?: { title: string; href: string }[]; // Allow one level of nesting
}

interface NavLink {
  title: string;
  href?: string;
  items?: NavSubItem[];
  component?: React.ReactNode;
}

export const NAVLINKS: NavLink[] = [
  {
    title: "Interview Guide",
    items: [
      {
        title: "WebTech",
        items: [
          { title: "Html", href: "/html/introduction" },
          { title: "Css", href: "#" },
          { title: "Javascript", href: "#" },
          { title: "React", href: "#" },
        ],
      },
      { title: "Next Js", href: "#" },
      { title: "Backend", href: "#" },
      { title: "DevOps", href: "#" },
      { title: "System Design", href: "#" },
      { title: "Web3", href: "#" },
    ],
  },
  {
    title: "Playgrounds",
    href: "#",
  },
  {
    title: "Practice",
    href: "#",
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
    <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
      <div className="sm:container mx-auto w-[95vw] h-full flex items-center justify-between md:gap-2">
        <div className="flex items-center gap-5">
          <SheetLeftbar />
          <div className="flex items-center gap-6">
            <div className="sm:flex hidden">
              <Logo />
            </div>
            <div className="lg:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
              <NavMenu />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search />
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
                <TwitterIcon className="h-[1.1rem] w-[1.1rem]" />
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <LogoIcon />
      <h2 className="text-md font-bold ">Dev Axioms</h2>
    </Link>
  );
}

export function NavMenu({ isSheet = false }) {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = React.useState<string | null>(null);
  const [openCollapsible, setOpenCollapsible] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!isSheet) {
      const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target as Element).closest(".dropdown-container")) {
          setOpenDropdown(null);
          setOpenSubDropdown(null);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isSheet]);

  if (isSheet) {
    return (
      <div className="flex flex-col w-full gap-2 ">
        {NAVLINKS.map((item) => {
          if (item.items) {
            return (
              <Collapsible
                key={item.title}
                open={openCollapsible.includes(item.title)}
                onOpenChange={(open) => {
                  setOpenCollapsible(prev => 
                    open 
                      ? [...prev, item.title]
                      : prev.filter(title => title !== item.title)
                  );
                }}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-md">
                  <span>{item.title}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      openCollapsible.includes(item.title) && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-4 mt-2 space-y-1">
                  {item.items.map((subItem) => {
                    if (subItem.items) {
                      return (
                        <Collapsible
                          key={subItem.title}
                          open={openCollapsible.includes(subItem.title)}
                          onOpenChange={(open) => {
                            setOpenCollapsible(prev => 
                              open 
                                ? [...prev, subItem.title]
                                : prev.filter(title => title !== subItem.title)
                            );
                          }}
                        >
                          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-md">
                            <span>{subItem.title}</span>
                            <ChevronDown
                              className={cn(
                                "h-4 w-4 transition-transform duration-200",
                                openCollapsible.includes(subItem.title) && "rotate-180"
                              )}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-4 mt-2 space-y-2">
                            {subItem.items.map((nestedItem) => (
                              <SheetClose key={nestedItem.title} asChild>
                                <Anchor
                                  activeClassName="!text-primary dark:font-medium font-semibold"
                                  absolute
                                  className="block p-2 hover:bg-accent rounded-md w-full"
                                  href={nestedItem.href || "#"}
                                >
                                  {nestedItem.title}
                                </Anchor>
                              </SheetClose>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      );
                    }
                    return (
                      <SheetClose key={subItem.title} asChild>
                        <Anchor
                          activeClassName="!text-primary dark:font-medium font-semibold"
                          absolute
                          className="block p-2 hover:bg-accent rounded-md w-full"
                          href={subItem.href || "#"}
                        >
                          {subItem.title}
                        </Anchor>
                      </SheetClose>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>
            );
          }

          return (
            <SheetClose key={item.title} asChild>
              <Anchor
                activeClassName="!text-primary dark:font-medium font-semibold"
                absolute
                className="block p-2 hover:bg-accent rounded-md w-full"
                href={item.href || "#"}
              >
                {item.title}
              </Anchor>
            </SheetClose>
          );
        })}
      </div>
    );
  }

  // Return existing dropdown implementation for non-sheet version
  return (
    <>
      {NAVLINKS.map((item) => {
        if (item.items || item.component) {
          return (
            <div key={item.title} className="relative dropdown-container">
              <button
                className="flex items-center gap-1 dark:text-stone-300/85 text-stone-800 transition-colors duration-200 hover:text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(
                    openDropdown === item.title ? null : item.title
                  );
                  setOpenSubDropdown(null);
                }}
              >
                {item.title}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ease-out ${
                    openDropdown === item.title ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`absolute left-0 top-full pt-2 transition-all duration-200 ease-in-out ${
                  openDropdown === item.title
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <div
                  className={`bg-background border rounded-md shadow-lg ${
                    item.component ? "w-max" : "w-48"
                  }`}
                >
                  {item.component
                    ? item.component
                    : item.items?.map((subItem) => {
                        const hasNestedItems =
                          subItem.items && subItem.items.length > 0;

                        const Comp = (
                          <div
                            key={subItem.title + subItem.href}
                            className="relative"
                            onMouseEnter={() =>
                              hasNestedItems &&
                              setOpenSubDropdown(subItem.title)
                            }
                            onMouseLeave={() => setOpenSubDropdown(null)}
                          >
                            {hasNestedItems ? (
                              <button className=" px-4 py-2 hover:bg-accent w-full flex items-center justify-between">
                                {subItem.title}
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            ) : (
                              <Anchor
                                activeClassName="!text-primary dark:font-medium font-semibold"
                                absolute
                                className=" px-4 py-2 hover:bg-accent w-full flex items-center justify-between"
                                href={subItem.href || "#"}
                                onClick={() => setOpenDropdown(null)}
                              >
                                {subItem.title}
                              </Anchor>
                            )}

                            {/* Nested Dropdown */}
                            {hasNestedItems && (
                              <div
                                className={`absolute left-full top-0 ml-0.5 w-48 transition-all duration-150 ease-in-out ${
                                  openSubDropdown === subItem.title
                                    ? "visible translate-x-0 opacity-100"
                                    : "invisible -translate-x-1 opacity-0"
                                }`}
                              >
                                <div className="bg-background border rounded-md shadow-lg">
                                  {subItem.items?.map((nestedItem) => (
                                    <Anchor
                                      key={nestedItem.title + nestedItem.href}
                                      activeClassName="!text-primary dark:font-medium font-semibold"
                                      absolute
                                      className="block px-4 py-2 hover:bg-accent"
                                      href={nestedItem.href || "#"}
                                      onClick={() => {
                                        setOpenDropdown(null);
                                        setOpenSubDropdown(null);
                                      }}
                                    >
                                      {nestedItem.title}
                                    </Anchor>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );

                        return Comp;
                      })}
                </div>
              </div>
            </div>
          );
        }

        // Regular link with hover effect
        const Comp = (
          <Anchor
            key={item.title + (item.href || "")}
            activeClassName="!text-primary dark:font-medium font-semibold"
            absolute
            className="flex items-center gap-1 dark:text-stone-300/85 text-stone-800 transition-colors duration-200 hover:text-primary"
            href={item.href || "#"}
          >
            {item.title}
          </Anchor>
        );
        return Comp;
      })}
    </>
  );
}

interface LogoProps {
  className?: string;
}

export const LogoIcon = ({ className }: LogoProps) => {
  return (
    <svg
      className={cn("w-6 h-6 dark:fill-white", className)}
      viewBox="0 0 70 69.96970834763681"
    >
      <g transform="translate(-22.207152258424557, -22.23577583940203) scale(0.2861746762684532)">
        <g xmlns="http://www.w3.org/2000/svg">
          <path d="M182.4,123.3c6.4,1.9,12.9,3.2,19.5,4.1c1.7,0.2,3.4,0.4,5,0.6c0.1-0.6,0.2-1.3,0.3-1.9c0.7-4.3,1.5-8.7,2.2-13   c1.6-9.7,3.3-19.5,6.4-28.8c0.6-1.7,1.2-3.4,1.8-5.1c-4-0.6-8.1-1-12.1-1.2c-1-0.1-2-0.1-2.9-0.1c-0.7,5.6-2.1,11.1-4.1,16.3   c-2.8,7.5-6.4,14.7-10.8,21.5C186.1,118.2,184.3,120.7,182.4,123.3z"></path>
          <path d="M204.9,146.2c0.2-3.1,0.4-6.2,0.8-9.3c-4.4-0.4-8.7-1.1-13-1.9c-5.5-1-11-2.4-16.3-4.1c-1,1.2-2.1,2.4-3.2,3.6   c-7.1,7.8-15.1,14.7-23.9,20.5c-2.5,1.7-5.1,3.3-7.8,4.8c1.6,7.2,2.2,14.8,1.6,22.1c-0.2,3-0.6,6.1-1.2,9.1   c1.5-0.2,2.9-0.4,4.4-0.6c20.3-2.8,40.4-6.7,60.2-11.9C204.9,167.8,204.3,157,204.9,146.2z"></path>
          <path d="M133.1,217.4c-0.6,1.4-1.3,2.7-1.9,4c2.8,1,5.6,2.1,8.3,3.4c9.2,4.3,17.8,10,25.2,16.9c0.2,0.2,0.5,0.4,0.7,0.6   c13.1-17.3,25.7-35.1,37.1-53.5c-20.7,5.1-41.6,8.9-62.8,11.4C137.9,206.1,135.7,211.8,133.1,217.4z"></path>
          <path d="M215.9,128.6c6,0.2,12.1,0.1,18.1-0.4c2.6-6.3,5-12.6,7.3-19.1c2.4-7.1,4.7-14.3,6.2-21.7c-0.9-0.4-1.9-0.8-2.8-1.2   c-5.8-2.3-11.8-4.2-18-5.6c-3.4,8.4-5.4,17.4-7.1,26.3c-0.8,4.3-1.5,8.7-2.2,13C216.9,122.9,216.4,125.7,215.9,128.6z"></path>
          <path d="M220.6,137.7c-2,0-3.9-0.1-5.9-0.2c-1.1,10.4-1.3,20.8-0.3,31.1c5.7-10.2,10.9-20.6,15.7-31.2   C226.9,137.6,223.7,137.7,220.6,137.7z"></path>
          <path d="M244.2,126.9c9.6-1.7,19-4.4,28.1-8.2c4.4-1.9,8.7-4,12.8-6.3c-5.2-5.1-10.9-9.8-17.1-13.9c-3.8-2.6-7.8-4.9-12.1-7.1   c-2.6,11.6-6.6,22.9-11,34C244.6,125.8,244.4,126.4,244.2,126.9z"></path>
          <path d="M246.8,135.5c-2.2,0.4-4.4,0.7-6.6,1c-3,7.1-6.3,14.1-9.7,21c-2.9,5.7-5.9,11.3-9,16.8c16.6-4.9,32.9-10.6,48.9-17.3   c12.2-5.2,24.1-10.9,35.8-17.2c-0.7-1.2-1.4-2.4-2.1-3.5c-3.6-5.9-7.8-11.7-12.7-17.2c-4.3,2.5-8.8,4.8-13.4,6.8   C268,130.3,257.6,133.7,246.8,135.5z"></path>
          <path d="M216.9,185c1.8,7.9,4.2,15.6,7.3,23.1c4.3,10.1,9.8,19.6,16.4,28.4c0.3,0.4,0.7,0.9,1,1.3c5.2-8.4,11.3-16.3,18-23.6   c8.4-9.1,17.8-17.3,28.1-24.1c9.9-6.5,20.5-11.9,31.6-16.1c-0.9-3.9-1.9-7.8-3.2-11.6c-1.6-4.9-3.6-9.8-5.8-14.5   c-7.2,3.9-14.4,7.5-21.8,10.9C265.4,169.5,241.4,178.2,216.9,185z"></path>
          <path d="M321,182.9c-1.4,0.5-2.9,1.1-4.3,1.7c-11.5,4.9-22.3,11.2-32.2,18.7c-10,7.8-18.9,16.8-26.7,26.8c-3.6,4.7-6.9,9.6-10,14.7   c6.6,7.1,13.9,13.6,21.6,19.6c7.3,5.6,14.9,10.8,22.5,15.9c4.7-5.3,8.9-11,12.6-17c4.5-7.3,8.3-15.4,11.3-24.1   c2.7-8,4.7-16.7,5.7-25.9C322.6,203.4,322.4,193.1,321,182.9z"></path>
          <path d="M221,222.2c-4.6-9-8.4-18.5-11.1-28.3c-11.8,18.9-24.8,37.1-38.2,54.8c1.8,2,3.6,4.1,5.3,6.3c3.8,4.8,7.4,9.9,10.6,15.2   c3.3,5.5,6.2,11.3,8.7,17.2c4.8-1.2,9.7-2.1,14.6-2.5c2.4-0.2,4.8-0.3,7.2-0.3c1.4,0,2.8,0,4.1,0.1c1-4.5,2.2-8.9,3.6-13.3   c2.9-8.8,6.6-17.3,11-25.4C230.7,238.6,225.4,230.7,221,222.2z"></path>
          <path d="M220.5,293.6c-0.8,0-1.5,0-2.3,0c-3.5,0-6.9,0.2-10.4,0.7c-2.8,0.4-5.5,0.9-8.2,1.6c0.8,2.1,1.5,4.2,2.2,6.3   c2.1,6.5,3.8,13.2,5.3,19.9c4.3-0.3,8.7-0.8,13.2-1.5c-0.3-1.2-0.5-2.3-0.7-3.5c-0.7-5.1-0.7-10.2-0.2-15.4   C219.6,298.9,220,296.3,220.5,293.6z"></path>
          <path d="M270.1,276.1c-9.5-7-18.7-14.4-26.9-23c-1.7,3.3-3.3,6.7-4.8,10.1c-3,7.3-5.4,14.8-7.2,22.5c5.1,0.9,10,2.4,14.8,4.2   c5.8,2.3,11.5,5,16.9,8.3c1.7,1,3.4,2.1,5.1,3.2c0.1-0.1,0.3-0.2,0.4-0.3c6.2-4.2,12-8.9,17.3-14.2c-0.2-0.2-0.5-0.3-0.7-0.5   C279.9,283.2,274.9,279.7,270.1,276.1z"></path>
          <path d="M229.4,294.5c-0.3,1.7-0.6,3.3-0.8,5c-0.6,5.2-0.9,10.4-0.3,15.6c0.2,1.2,0.4,2.4,0.7,3.6c10.5-2.6,20.8-6.6,30.4-12   c-4.5-2.7-9.1-5.2-13.9-7.3C240.3,297.3,234.9,295.6,229.4,294.5z"></path>
          <path d="M146.8,266.4c0,0-0.1,0.1-0.1,0.1c-0.2,0.3-0.4,0.5-0.6,0.8C146.4,267,146.6,266.7,146.8,266.4z"></path>
          <path d="M158.7,250.9c0.4-0.5,0.7-0.9,1.1-1.4c-2.3-2.2-4.7-4.3-7.3-6.3c-6.1-4.6-12.6-8.4-19.6-11.5c-2-0.8-4-1.6-6.1-2.3   c-3.7,6.5-7.7,12.8-12.1,18.9c-5,7.1-10.4,13.9-15.8,20.7c1.3,1.9,2.8,3.9,4.4,6c5.2,6.7,11.1,12.9,17.6,18.4   c0.5,0.4,0.9,0.8,1.4,1.2c8.9-8.6,16.8-18.3,24.3-28.1C150.8,261.3,154.7,256.1,158.7,250.9z"></path>
          <path d="M187.6,290c-4.4-9.9-9.9-19.3-16.5-27.9c-1.6-2.1-3.3-4.1-5.1-6.1c-0.9,1.1-1.7,2.2-2.6,3.3c-9.4,12.2-18.5,24.7-29.1,35.9   c-1.6,1.6-3.1,3.3-4.7,4.8c4.2,3,8.7,5.7,13.2,8.1c2.9,1.5,5.9,3,8.9,4.3c0.1-0.1,0.2-0.1,0.2-0.2c2.9-2.7,6-5.3,9.1-7.7   c4.3-3.4,8.8-6.4,13.7-9C179,293.5,183.2,291.6,187.6,290z"></path>
          <path d="M186.1,300.2c-6.6,2.9-12.8,6.4-18.6,10.8c-2.1,1.6-4.2,3.3-6.2,5.1c2,0.7,4,1.3,6,1.8c8.3,2.3,17.1,3.7,26.3,4.2   c1.4,0.1,2.8,0.1,4.3,0.1c-1.9-8.1-4.1-16.1-6.9-23.9C189.3,298.9,187.7,299.6,186.1,300.2z"></path>
          <path d="M113.2,193.7c3.7-0.3,7.4-0.6,11-0.9c2.8-0.2,5.6-0.5,8.3-0.8c0.5-2.1,0.9-4.3,1.2-6.4c0.7-6.1,0.8-12.1,0-18.2   c-0.2-1.1-0.3-2.2-0.6-3.3c-6.1,3-12.5,5.4-19,7.4c-11.1,3.3-22.7,5.2-34.2,5.2c-1.3,6.5-2.1,13.1-2.3,19.7   c8.3-0.2,16.6-0.9,24.8-1.7C106.1,194.3,109.7,194,113.2,193.7z"></path>
          <path d="M109.8,216.3c4.3,0.6,8.5,1.3,12.7,2.4c1.6-3.1,3-6.2,4.4-9.4c1.1-2.7,2.1-5.4,3.1-8.1c-1.3,0.1-2.6,0.3-4,0.4   c-6.5,0.6-13,1.1-19.5,1.7c-6.5,0.6-13,1.3-19.6,1.7c-3,0.2-6,0.3-9.1,0.4c0.2,3.9,0.5,7.9,1.1,11.8c0.2,0,0.4-0.1,0.5-0.1   c6-1,12-1.6,18.1-1.6C101.6,215.5,105.7,215.8,109.8,216.3z"></path>
          <path d="M117.9,226.9c-2.7-0.6-5.5-1.2-8.3-1.6c-4.1-0.5-8.3-0.8-12.4-0.8c-4.2,0-8.4,0.3-12.6,0.8c-1.4,0.2-2.8,0.4-4.2,0.7   c0.1,0.3,0.1,0.7,0.2,1c1.8,8.4,4.8,16.9,8.8,25.5c1.3,2.8,2.8,5.6,4.4,8.5c1.9-2.3,3.7-4.7,5.5-7   C106.1,245.3,112.4,236.3,117.9,226.9z"></path>
          <path d="M153.5,109.3c5.4,4,11.2,7.3,17.4,9.9c0.9,0.4,1.7,0.7,2.6,1c0-0.1,0.1-0.1,0.1-0.2c5.9-7.7,11-16,14.9-25   c2.3-5.6,4.1-11.3,5-17.3c-0.2,0-0.4,0-0.6,0c-9.1,0.6-18.1,2.1-26.6,4.6c-8.2,2.4-16.3,5.7-24.2,10c-0.8,0.4-1.6,0.9-2.4,1.3   c1.1,1.9,2.3,3.8,3.7,5.6C146.3,103.1,149.7,106.4,153.5,109.3z"></path>
          <path d="M127,129.7c3,3.7,5.7,7.6,7.9,11.8c1.5,3,2.9,6.1,4.1,9.2c4.4-2.6,8.7-5.5,12.8-8.6c5.6-4.4,10.8-9.4,15.6-14.7   c-0.7-0.3-1.4-0.6-2-0.9c-8.4-3.7-16.3-8.6-23-15c-3.3-3.2-6.3-6.7-8.8-10.6c-0.5-0.8-1-1.6-1.5-2.5c-3.9,2.7-7.8,5.6-11.6,8.9   c-2.5,2.1-4.9,4.4-7.4,6.9C118.2,119,122.7,124.3,127,129.7z"></path>
          <path d="M123.8,158.5c2.4-1,4.8-2.2,7.2-3.4c-0.5-1.5-1-3-1.6-4.5c-2.2-5-4.9-9.7-8.2-14.1c-4.3-5.5-8.9-10.9-14.1-15.6   c-1.4,1.6-2.8,3.4-4.3,5.4c-5.2,6.8-9.7,14.3-13.5,22.3c-2.9,6.1-5.2,12.5-7,19c3.9-0.1,7.8-0.4,11.6-0.9   C104.1,165.3,114.2,162.5,123.8,158.5z"></path>
        </g>
      </g>
    </svg>
  );
};
