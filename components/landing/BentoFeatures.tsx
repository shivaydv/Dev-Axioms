"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BentoFeatures() {
    return (
        <section className="py-24 bg-background border-b border-border/40 border-dashed">
            <div className="max-w-[1250px] mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
                    <div className="lg:w-5/12 pt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#FF5A26] mb-4 block">
                                STRUCTURED INTERVIEW PRACTICE
                            </span>
                            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-foreground leading-[1.1]">
                                From Concept Revision to Real Machine Coding Rounds
                            </h2>
                            <p className="text-[15px] text-muted-foreground mb-8 leading-relaxed max-w-[90%]">
                                Revise important concepts, solve curated interview questions, and practice real machine coding rounds in a focused, distraction-free environment.
                            </p>

                            {/* <Link
                                href="/practice"
                                className={cn(
                                    buttonVariants({ variant: "default", size: "default" }),
                                    "rounded-md px-6 h-10 font-medium bg-foreground text-background"
                                )}
                            >
                                Start Practicing
                            </Link> */}

                            <div className="mt-16 flex items-center gap-4 border-t border-border pt-6">
                                <div className="w-5 h-5 flex items-center justify-center bg-muted rounded-sm">
                                    <span className="w-2 h-2 bg-foreground rounded-[2px] block" />
                                </div>
                                <div>
                                    <p className="font-medium text-[13px] text-muted-foreground inline-block align-middle mr-1">Live editor with preview for real interview-style practice.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-7/12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="relative rounded-2xl overflow-hidden border border-border bg-muted/20 h-[500px]"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
                                alt="Platform UI Placeholder"
                                fill
                                className="object-cover opacity-60 transition-all duration-700"
                            />

                            {/* Floating UI element */}
                            <div className="absolute bottom-10 left-10 right-10 md:right-auto md:w-[320px] bg-background border border-border rounded-xl shadow-2xl p-5 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
                                    <div className="w-8 h-8 rounded bg-foreground text-background flex items-center justify-center font-bold text-xs">
                                        RC
                                    </div>
                                    <div>
                                        <p className="font-medium text-xs text-foreground">React Challenges</p>
                                    </div>
                                    <div className="ml-auto text-xs text-muted-foreground">22 Available</div>
                                </div>

                                <div className="space-y-4 text-xs font-medium">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span className="flex items-center gap-2">Difficulty</span>
                                        <span className="text-foreground">Advanced</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span className="flex items-center gap-2">Framework</span>
                                        <span className="text-foreground">Next.js 14</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span className="flex items-center gap-2">Modules</span>
                                        <span className="text-foreground">12 Sections</span>
                                    </div>
                                </div>
                                <button className="w-full mt-6 py-2 rounded bg-muted text-foreground text-[11px] uppercase tracking-wider font-semibold hover:bg-muted/80 transition-colors">
                                    + 15 More Attributes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
