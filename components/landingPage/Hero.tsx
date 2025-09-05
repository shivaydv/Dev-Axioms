"use client";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Hero(): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-background/0 relative z-[2] container flex flex-col overflow-hidden border-x border-t px-6 pt-12 pb-12 md:px-12 md:pt-16 md:pb-24 [.uwu_&]:hidden"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          ease: [0.24, 0.25, 0.05, 1.0],
        }}
        className="mb-8 max-w-[600px] text-2xl font-semibold md:text-4xl"
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
        className="text-muted-foreground mb-8 text-sm md:max-w-[80%] md:text-xl"
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
        className="inline-flex items-center gap-3"
      >
        <Link
          href="/web-dev/html"
          className={cn(
            buttonVariants({ size: "lg", className: "rounded-full" }),
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
              className: "bg-background rounded-full",
            }),
          )}
        >
          Playground
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="bg-background absolute inset-0 z-[-1]"
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

export default Hero;
