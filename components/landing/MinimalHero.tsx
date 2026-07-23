"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaGithub, FaCode, FaBookOpen } from "react-icons/fa6";
import { MoveRight, ArrowUpRight } from "lucide-react";

export function MinimalHero() {
    return (
        <section className="relative pt-16 md:pt-24 pb-20 bg-background overflow-hidden border-b border-border/40">
            {/* Subtle Gradient & Grid Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
                {/* Hero Header */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
                    {/* Eyebrow Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6"
                    >
                        <Link
                            href="https://github.com/shivaydv/Dev-Axioms"
                            target="_blank"
                            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-muted/60 hover:bg-muted border border-border/80 text-xs font-medium text-foreground transition-all duration-300 hover:scale-[1.01] shadow-sm"
                        >
                            <FaGithub className="w-3.5 h-3.5 text-foreground" />
                            <span className="text-muted-foreground font-normal">Free & Open Source</span>
                            <span className="text-muted-foreground/30">•</span>
                            <span className="font-semibold text-foreground">Dev Axioms</span>
                            <ArrowUpRight className="w-3 h-3 text-muted-foreground ml-0.5" />
                        </Link>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08, duration: 0.4 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-[1.08] mb-6"
                    >
                        Everything You Need to Prepare for Developer Interviews.
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.16, duration: 0.4 }}
                        className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8"
                    >
                        Dev Axioms helps you quickly revise core technical concepts, explore real interview questions, and practice machine coding rounds — all in one focused workspace.
                    </motion.p>

                    {/* Primary Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.24, duration: 0.4 }}
                        className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
                    >
                        <Link
                            href="/practice"
                            className={cn(
                                buttonVariants({ size: "lg" }),
                                "w-full sm:w-auto rounded-xl px-7 h-11 text-xs font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 shadow-md flex items-center justify-center gap-2 group"
                            )}
                        >
                            <FaCode className="w-3.5 h-3.5" />
                            <span>Start Practicing</span>
                            <MoveRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/web-dev"
                            className={cn(
                                buttonVariants({ variant: "outline", size: "lg" }),
                                "w-full sm:w-auto rounded-xl px-7 h-11 text-xs font-semibold bg-card/60 border-border/80 hover:bg-muted/80 backdrop-blur-sm flex items-center justify-center gap-2"
                            )}
                        >
                            <FaBookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>Browse Documentation</span>
                        </Link>
                    </motion.div>

                    {/* Platform Domains Badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="mt-8 flex items-center justify-center"
                    >
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-muted/40 px-4 py-2 rounded-full border border-border/60 text-xs font-medium text-muted-foreground">
                            <span className="text-foreground font-semibold">Web Development</span>
                            <span className="text-border">•</span>
                            <span className="text-foreground font-semibold">Web3 & Crypto</span>
                            <span className="text-border">•</span>
                            <span className="text-foreground font-semibold">Machine Coding</span>
                            <span className="text-border">•</span>
                            <span className="text-foreground font-semibold">System Architecture</span>
                        </div>
                    </motion.div>
                </div>

                {/* Dual Showcase Cards - Side by Side Product Display */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
                >
                    {/* Card 1: Practice Arena */}
                    <div className="rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden group flex flex-col justify-between">
                        <div className="p-4 border-b border-border/60 bg-muted/30 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                            </div>
                            <span className="text-xs font-medium text-foreground">Practice Arena</span>
                        </div>
                        <div className="relative w-full h-[260px] sm:h-[320px] bg-muted/20 overflow-hidden">
                            <Image
                                src="/banner.png"
                                alt="Dev Axioms Practice Arena"
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                                priority
                            />
                        </div>
                        <div className="p-5 border-t border-border/60 bg-background/80 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-sm text-foreground">Interactive Question Bank</h3>
                                <p className="text-xs text-muted-foreground">Easy, Medium & Hard coding challenges.</p>
                            </div>
                            <Link
                                href="/practice"
                                className="px-3.5 py-1.5 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1 shrink-0"
                            >
                                <span>Practice</span>
                                <MoveRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>

                    {/* Card 2: Documentation & Axioms */}
                    <div className="rounded-2xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-xl overflow-hidden group flex flex-col justify-between">
                        <div className="p-4 border-b border-border/60 bg-muted/30 flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70 inline-block" />
                            </div>
                            <span className="text-xs font-medium text-foreground">Documentation & Axioms</span>
                        </div>
                        <div className="relative w-full h-[260px] sm:h-[320px] bg-muted/20 overflow-hidden">
                            <Image
                                src="/banner2.png"
                                alt="Dev Axioms Documentation"
                                fill
                                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                        </div>
                        <div className="p-5 border-t border-border/60 bg-background/80 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-sm text-foreground">First-Principles Notes</h3>
                                <p className="text-xs text-muted-foreground">Distilled revision docs for interviews.</p>
                            </div>
                            <Link
                                href="/web-dev"
                                className="px-3.5 py-1.5 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1 shrink-0"
                            >
                                <span>Read Axioms</span>
                                <MoveRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
