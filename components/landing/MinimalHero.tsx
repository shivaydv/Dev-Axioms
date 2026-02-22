"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function MinimalHero() {
    return (
        <section className="relative pt-20 md:pt-28 pb-16 bg-background overflow-hidden border-b border-border/40 border-dashed">
            <div className="max-w-[1250px] mx-auto px-6">
                {/* Text Content - Left Aligned */}
                <div className="max-w-4xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Free & Open Source • Built for Developer Interview Prep
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-4xl md:text-[3.5rem] font-medium tracking-tight mb-6 text-foreground leading-[1.05]"
                    >
                        Everything You Need to Prepare for Developer Interviews
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-base md:text-sm text-muted-foreground mb-10 leading-relaxed max-w-xl"
                    >
                       Dev Axioms helps you quickly revise key concepts, explore real interview questions, and practice machine coding rounds — all in one focused platform.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/practice"
                            className={cn(
                                buttonVariants({ size: "default" }),
                                "rounded-md px-8 h-11 text-sm font-medium bg-foreground text-background"
                            )}
                        >
                            Start Practicing
                        </Link>
                        <Link
                            href="/web-dev/html-css/basic-html"
                            className={cn(
                                buttonVariants({ variant: "outline", size: "default" }),
                                "rounded-md px-8 h-11 text-sm font-medium bg-transparent border-border hover:bg-muted"
                            )}
                        >
                            Browse Questions
                        </Link>
                    </motion.div>
                </div>

                {/* Imagery - Two Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="rounded-xl overflow-hidden bg-muted/30 border border-border h-[250px] md:h-[350px] relative transition-all duration-700"
                    >
                        <Image
                            src="/banner.png"
                            alt="Interactive Editor"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8 opacity-0 hover:opacity-100 transition-all duration-700">
                            <div className="text-white w-full">
                                <p className="font-semibold text-base mb-1 tracking-tight">Practice Questions</p>
                                <p className="text-[13px] text-white/70 leading-relaxed max-w-xs">Explore real interview questions and practice coding rounds.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="rounded-xl overflow-hidden bg-muted/30 border border-border h-[250px] md:h-[350px] relative  transition-all duration-700"
                    >
                        <Image
                            src="/banner2.png"
                            alt="Dev Axioms Documentation"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8 opacity-0 hover:opacity-100 transition-all duration-700">
                            <div className="text-white w-full">
                                <p className="font-semibold text-base mb-1 tracking-tight">Dev Axioms Documentation</p>
                                <p className="text-[13px] text-white/70 leading-relaxed max-w-xs">Comprehensive documentation for all features and integrations.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
