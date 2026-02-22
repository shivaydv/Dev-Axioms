import React from "react";
import { Logo } from "@/components/global/Logo";
import { GithubIcon } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background py-16">
      <div className="mx-auto max-w-[1250px] px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col gap-4 md:items-start md:gap-2">
            <Logo />
            <p className="text-muted-foreground text-sm">
              All-in-one platform to learn and practice developer interviews.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 md:items-end md:gap-4">
            <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
              <Link
                href="/web-dev"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Docs
              </Link>
              <Link
                href="/practice"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Practice
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Blog
              </Link>

              <div className="hidden h-3 w-px bg-border md:block" />

              <Link
                href="https://zedui.vercel.app"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Zed UI
              </Link>
              <Link
                href="https://endorsy.in"
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                Endorsy
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/shivaydv/Dev-Axioms"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted hover:bg-accent text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
              </Link>
              <Link
                href="https://x.com/shivay1256"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted hover:bg-accent text-muted-foreground hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              >
                <FaXTwitter className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-border mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Dev Axioms. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-foreground text-xs transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

