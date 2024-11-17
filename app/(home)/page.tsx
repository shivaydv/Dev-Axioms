import { cn } from "fumadocs-ui/components/api";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLAttributes, ReactNode } from "react";
import Img from "./img.png";
import { FaTerminal } from "react-icons/fa6";
import { Heart, type LucideIcon, MousePointer, Terminal } from 'lucide-react';
import {
  BatteryChargingIcon,
  CpuIcon,
  FileEditIcon,
  FileTextIcon,
  KeyboardIcon,
  LayoutIcon,
  LibraryIcon,
  PaperclipIcon,
  PersonStandingIcon,
  RocketIcon,
  SearchIcon,
  TimerIcon,
} from 'lucide-react';
import { CodeBlock } from "@/components/Codeblock";
import { cva } from "class-variance-authority";
import { NextSVG, OpenAPIIcon } from "./icons";

const page = () => {
  return (
    <div className="">
      <div
        className="absolute inset-x-0 top-[200px] h-[250px] max-md:hidden"
        style={{
          background:
            "repeating-linear-gradient(to right, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px), repeating-linear-gradient(to bottom, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px)",
        }}
      />
      <main className="container relative max-w-[1100px] px-2 py-4 lg:py-16">
        <div
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent, hsl(var(--secondary)/.2) 500px, transparent 1000px)",
          }}
        >
          <div className="relative">
            <Hero />
          </div>
          <Feedback />
          <div className="container border-x border-t py-16 md:py-24">
            <Terminal className="mx-auto mb-2 size-8 text-muted-foreground" />
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">
              Start instantly.
              <br />
              Make it yours, Ship within seconds.
            </h2>
          </div>
          {/* // TODO: Add features */}
          <Highlights />
          <div
            className="container relative overflow-hidden border-x border-t py-16 sm:py-24"
            style={{
              backgroundImage:
                'radial-gradient(circle at bottom center, hsl(var(--secondary)), hsl(var(--background)))',
            }}
          >
            <h2 className="bg-gradient-to-b from-fd-primary to-fd-foreground/40 bg-clip-text text-center text-2xl font-semibold text-transparent sm:text-3xl">
              Loved by users.
              <br />
              Built for developers.
            </h2>
          </div>
          <End />
        </div>
      </main>
    </div>
  );
};

function Hero(): React.ReactElement {
  return (
    <div className="container relative z-[2] flex flex-col overflow-hidden border-x border-t bg-fd-background px-6 pt-12 max-md:text-center md:px-12 md:pt-16 [.uwu_&]:hidden">
      <h1 className="mb-8 text-4xl font-medium md:hidden">Build Your Docs</h1>
      <h1 className="mb-8 max-w-[600px] text-4xl font-medium max-md:hidden">
        Build excellent documentation site with less effort
      </h1>
      <p className="mb-8 text-fd-muted-foreground md:max-w-[80%] md:text-xl">
        Fumadocs is a <span className="text-fd-foreground">beautiful</span>{" "}
        documentation framework with{" "}
        <span className="text-fd-foreground">a complete toolchain</span>,
        powered by <span className="text-foreground">Next.js App Router</span>.
        Designed to be flexible and fast.
      </p>
      <div className="inline-flex items-center gap-3 max-md:mx-auto">
        <Link
          href="/docs/ui"
          className={cn(
            buttonVariants({ size: "lg", className: "rounded-full" })
          )}
        >
          Getting Started
        </Link>
        <a
          href="https://githubbox.com/fuma-nama/fumadocs-ui-template"
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "outline",
              className: "rounded-full bg-fd-background",
            })
          )}
        >
          Open Demo
        </a>
      </div>
      <Image
        src={Img}
        alt="preview"
        className="mb-[-250px] mt-8 min-w-[800px] select-none duration-1000 animate-in fade-in slide-in-from-bottom-12 md:mb-[-370px] md:min-w-[1100px]"
        priority
      />
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse at top, transparent 60%, hsla(250,90%,90%,0.2))",
            "linear-gradient(to bottom, transparent 30%, hsl(var(--primary) / 0.2))",
            "linear-gradient(to bottom, hsl(var(--background)) 40%, transparent)",
            "repeating-linear-gradient(45deg, transparent,transparent 60px, hsl(var(--primary)) 61px, transparent 62px)",
          ].join(", "),
        }}
      />
    </div>
  );
}

function Feedback(): React.ReactElement {
  return (
    <div className="relative flex flex-col items-center overflow-hidden border-x border-t px-6 py-8 md:py-16">
      <div
        className="absolute inset-x-0 bottom-0 z-[-1] h-24 opacity-30 duration-1000 animate-in fade-in"
        style={{
          maskImage: 'linear-gradient(to bottom,transparent,white)',
          backgroundImage:
            'linear-gradient(to right, #4ebfff, transparent, #e92a67)',
        }}
      />
      <p className="text-center font-medium text-muted-foreground">
        Trusted by awesome teams and developers
      </p>

      <div className="mt-6 rounded-xl border bg-gradient-to-b from-secondary p-4 shadow-lg">
        <p className="text-sm font-medium">
          {`"A gorgeous documentation framework that composes beautifully into the
          App Router."`}
        </p>
        <div className="mt-4 flex flex-row items-center gap-2">
          <img
            src="https://avatars.githubusercontent.com/u/35677084"
            alt="avatar"
            width="32"
            height="32"
            className="size-8 rounded-full"
          />
          <div>
            <a
              href="https://shew.dev"
              rel="noreferrer noopener"
              className="text-sm font-medium"
            >
              Anthony Shew
            </a>
            <p className="text-xs text-fd-muted-foreground">
              Turbo DX at Vercel
            </p>
          </div>
          <Link
            href="/showcase"
            className={cn(
              buttonVariants({ variant: 'outline', className: 'ml-auto' }),
            )}
          >
            Showcase
          </Link>
        </div>
      </div>
    </div>
  );
}

function Highlights(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 border-r md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-full flex flex-row items-start justify-center border-l border-t p-8 pb-2 text-center">
        <h2 className="bg-pink-300/50 pl-1 text-2xl font-semibold">
          Highlights
        </h2>
        <MousePointer className="-ml-1 mt-8" />
      </div>
      <Highlight icon={RocketIcon} heading="Light and Fast.">
        Powerful documentation site with Next.js App Router.
      </Highlight>
      <Highlight icon={TimerIcon} heading="Performance.">
        Less client components, less Javascript, optimized images.
      </Highlight>
      <Highlight icon={LayoutIcon} heading="Accessibility & UX first.">
        Focus on user experience and accessibility.
      </Highlight>
      <Highlight icon={SearchIcon} heading="Syntax Highlighting.">
        Beautiful syntax highlighter, powered by{' '}
        <a href="https://shiki.style" rel="noreferrer noopener">
          Shiki
        </a>
        .
      </Highlight>
      <Highlight icon={KeyboardIcon} heading="Automation.">
        Useful remark/rehype plugins. Typescript Twoslash, OpenAPI docs
        generation, and more.
      </Highlight>
      <Highlight icon={PersonStandingIcon} heading="Personalized.">
        Advanced options for customising your theme in a comfortable way.
      </Highlight>
    </div>
  );
}

function Highlight({
  icon: Icon,
  heading,
  children,
}: {
  icon: LucideIcon;
  heading: ReactNode;
  children: ReactNode;
}): React.ReactElement {
  return (
    <div className="border-l border-t px-6 py-12">
      <div className="mb-4 flex flex-row items-center gap-2 text-fd-muted-foreground">
        <Icon className="size-4" />
        <h2 className="text-sm font-medium">{heading}</h2>
      </div>
      <span className="font-medium">{children}</span>
    </div>
  );
}


function End(): React.ReactElement {
  return (
    <div className="grid grid-cols-1 border-b border-r md:grid-cols-2 lg:grid-cols-3">
      <div className="relative flex flex-col gap-8 overflow-hidden border-l border-t px-8 py-14">
        <h2 className="text-3xl font-semibold md:text-4xl">Build Your Docs.</h2>
        <ul className="mt-8 flex flex-col gap-6">
          <li>
            <span className="flex flex-row items-center gap-2 font-medium">
              <BatteryChargingIcon className="size-5" />
              Battery guaranteed.
            </span>
            <span className="mt-2 text-sm text-fd-muted-foreground">
              Actively maintained, open for contributions.
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-2 font-medium">
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Fully open-source.
            </span>
            <span className="mt-2 text-sm text-fd-muted-foreground">
              Open source, available on Github.
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-2 font-medium">
              <TimerIcon className="size-5" />
              Within seconds.
            </span>
            <span className="mt-2 text-sm text-fd-muted-foreground">
              Initialize a new project instantly with CLI.
            </span>
          </li>
        </ul>
        <div className="flex flex-row flex-wrap gap-2 border-t pt-8">
          <Link href="/docs" className={cn(buttonVariants())}>
            Read docs
          </Link>
          <a
            href="https://githubbox.com/fuma-nama/fumadocs-ui-template"
            rel="noreferrer noopener"
            className={cn(
              buttonVariants({
                variant: 'outline',
              }),
            )}
          >
            Open in CodeSandbox
          </a>
        </div>
      </div>
      <Integration className="border-t lg:col-span-2" />
    </div>
  );
}
const linkItemVariants = cva('transition-colors hover:bg-fd-muted');

function Integration({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      className={cn(
        'relative grid grid-cols-1 *:border-l *:border-t *:p-6 lg:grid-cols-3',
        className,
      )}
      {...props}
    >
      <Link href="/docs/ui/openapi" className={cn(linkItemVariants())}>
        <OpenAPIIcon className="mb-2 size-12" />
        <p className="text-lg font-medium">OpenAPI</p>
        <p className="text-sm text-fd-muted-foreground">
          Generate docs from your OpenAPI schema.
        </p>
      </Link>
      <Link href="/docs/mdx" className={cn(linkItemVariants())}>
        <NextSVG className="mb-2 size-12" />
        <p className="text-lg font-medium">Next.js</p>
        <p className="text-sm text-fd-muted-foreground">
          Enjoy the full power of App Router.
        </p>
      </Link>
      <Link
        href="/docs/headless/content-collections"
        className={cn(linkItemVariants())}
      >
        <Image
          alt="Content Collections logo"
          src="/content-collections.webp"
          className="mb-2 grayscale"
          width={48}
          height={48}
        />
        <p className="text-lg font-medium">Content Collections</p>
        <p className="text-sm text-fd-muted-foreground">
          Integrate with Content Collections, an alternative to Contentlayer.
        </p>
      </Link>
      <div className="col-span-full">
        <p className="text-sm font-medium">Available now</p>
        <CodeBlock
          wrapper={{ className: 'mt-2' }}
          lang="bash"
          code="pnpm create fumadocs-app"
        />
      </div>
      <div className="col-span-full h-[200px] overflow-hidden bg-gradient-to-b from-fd-primary/10">
        <div
          className="mx-auto size-[500px] rounded-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 0% 100%, transparent 60%, hsl(var(--primary)))',
          }}
        />
      </div>
    </div>
  );
}

export default page;
