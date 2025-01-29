"use client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";
import {
  type LucideIcon,
  BrainIcon,
  CodeIcon,
  MousePointer,
  BookOpen,
  User,
  CircleHelp,
  RocketIcon,
  TwitterIcon,
  GithubIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { LogoIcon, Navbar } from "@/components/docs/navbar";
import { ModeToggle } from "@/components/docs/theme-toggle";
import Search from "@/components/docs/search";

const page = () => {
  return (
    <div className="">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-x-0 top-[180px] h-[250px] max-md:hidden border-b"
        style={{
          background:
            "repeating-linear-gradient(to right, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px), repeating-linear-gradient(to bottom, hsl(var(--primary)/.1),hsl(var(--primary)/.1) 1px,transparent 1px,transparent 50px)",
        }}
      />
      <Navbar />
      <main className=" relative sm:container mx-auto w-[95vw] px-2 py-4 lg:py-12">
        <div
          style={{
            background:
              "repeating-linear-gradient(to bottom, transparent, hsl(var(--secondary)/.2) 500px, transparent 1000px)",
          }}
        >
          <Hero />
          {/* <Headline /> */}
          <Highlights />
          {/* <Feedback /> */}
        </div>
      </main>
    </div>
  );
};

function Hero(): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container relative z-[2] flex flex-col overflow-hidden border-x border-t bg-background/0 px-6 pt-12 pb-24 max-md:text-center md:px-12 md:pt-16 [.uwu_&]:hidden"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          ease: [0.24, 0.25, 0.05, 1.0],
        }}
        className="mb-8 text-4xl font-medium md:hidden"
      >
        Dev Axioms
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          ease: [0.24, 0.25, 0.05, 1.0],
        }}
        className="mb-8 max-w-[600px] text-4xl font-medium max-md:hidden"
      >
        Ace Your Dev Interviews
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.2,
          ease: [0.24, 0.25, 0.05, 1.0],
        }}
        className="mb-8 text-muted-foreground md:max-w-[80%] md:text-xl"
      >
        Dev Axioms is your{" "}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-foreground"
        >
          all-in-one platform
        </motion.span>{" "}
        for interview preparation, offering{" "}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-foreground"
        >
          comprehensive theory
        </motion.span>{" "}
        and{" "}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-foreground"
        >
          playgrounds
        </motion.span>{" "}
        to practice.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay: 0.4,
          ease: [0.24, 0.25, 0.05, 1.0],
        }}
        className="inline-flex items-center gap-3 max-md:mx-auto"
      >
        <Link
          href="/html/introduction"
          className={cn(
            buttonVariants({ size: "lg", className: "rounded-full" })
          )}
        >
          Get Started
        </Link>
        <Link
          href="/playground"
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "outline",
              className: "rounded-full bg-background",
            })
          )}
        >
          Playground
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-[-1] bg-background"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, rgba(233, 42, 103, 0.3) 0%, transparent 50%),
            linear-gradient(to bottom, hsl(var(--background)) 20%, transparent 80%),
            radial-gradient(circle at 0% 100%, rgba(78, 191, 255, 0.3) 0%, transparent 50%)
          `,
        }}
      />
    </motion.div>
  );
}

function Headline(): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="container relative overflow-hidden border-x border-t py-16 sm:py-24"
      style={{
        backgroundImage:
          "radial-gradient(circle at bottom center, hsl(var(--secondary)), hsl(var(--background)))",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-b from-primary to-foreground/40 bg-clip-text text-center text-2xl font-semibold text-transparent sm:text-3xl"
      >
        Interactive Learning Experience.
        <br />
        Code, Practice, Excel.
      </motion.h2>
    </motion.div>
  );
}

function Feedback(): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col items-center overflow-hidden border-x border-y px-6 py-8 md:py-16"
    >
      <div
        className="absolute inset-x-0 bottom-0 z-[-1] h-24 opacity-30 duration-1000 animate-in fade-in"
        style={{
          maskImage: "linear-gradient(to bottom,transparent,white)",
          backgroundImage:
            "linear-gradient(to right, #4ebfff, transparent, #e92a67)",
        }}
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center font-medium text-muted-foreground"
      >
        Your Path to Interview Success
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6 rounded-xl border bg-gradient-to-b from-secondary p-4 shadow-lg"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-sm font-medium"
        >
          {`"I built Dev Axioms to help developers ace their tech interviews."`}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-4 flex flex-row items-center justify-between "
        >
          <div className="flex flex-row items-center gap-2">
            <motion.img
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              src="https://avatars.githubusercontent.com/shivaydv"
              alt="Shiva Yadav"
              width="32"
              height="32"
              className="size-8 rounded-full"
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <a
                href="https://x.com/shivay1256"
                rel="noreferrer noopener"
                className="text-sm font-medium"
              >
                Shiva Yadav
              </a>
              <p className="text-xs text-muted-foreground">
                Creator of Dev Axioms
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Link
              href="https://github.com/shivaydv/dev-axioms"
              className={cn(
                buttonVariants({ variant: "outline", className: "self-end" })
              )}
            >
              GitHub
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Highlights(): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 border-r border-b bg-background/0 md:grid-cols-2 lg:grid-cols-3"
    >
      {/* <div className="col-span-full flex flex-row items-start justify-center border-l border-t p-8 pb-2 text-center">
        <h2 className="pl-1 text-2xl font-semibold mb-8">
          Features
        </h2>
        <MousePointer className="-ml-1 mt-8" />
      </div> */}

      <Highlight icon={BrainIcon} heading="Interview Questions">
        Comprehensive collection of technical interview questions.
      </Highlight>
      <Highlight icon={CodeIcon} heading="Interactive Playgrounds">
        Practice and master coding concepts with our interactive playgrounds.
      </Highlight>
      <Highlight icon={BookOpen} heading="Coding Round Preparation">
        Practice actual coding problems asked in coding rounds at top tech
        companies.
      </Highlight>
      <Highlight icon={User} heading="Community Contributions">
        It's open-source and anyone can contribute.
      </Highlight>
      <Highlight icon={CircleHelp} heading="Interview Tips">
        Get valuable tips and tricks to ace your technical interviews.
      </Highlight>
      <Highlight icon={RocketIcon} heading="Real-time Updates">
        Stay updated with the latest Tech and Interview trends.
      </Highlight>
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-l border-t px-6 py-12"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 flex flex-row items-center gap-2 text-muted-foreground"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Icon className="size-4" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-sm font-medium"
        >
          {heading}
        </motion.h2>
      </motion.div>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="font-medium"
      >
        {children}
      </motion.span>
    </motion.div>
  );
}

export default page;
