"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Code2, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export function MinimalCTA() {
    return (
        <section className="py-16 md:py-20 bg-background border-t border-border/40 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-muted/60 text-muted-foreground border border-border/60 text-[11px] font-medium mb-3">
                            <FaGithub className="w-3 h-3" />
                            <span>100% Free & Open Source</span>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mb-2">
                            Ready to prepare for developer interviews?
                        </h2>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Explore practice questions, revise concept axioms, and master frontend architecture without paywalls.
                        </p>
                    </div>

                    {/* Compact CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
                        <Link
                            href="/practice"
                            className="w-full sm:w-auto px-5 h-9 rounded-lg bg-foreground text-background text-xs font-semibold flex items-center justify-center gap-2 hover:bg-foreground/90 transition-all shadow-sm group"
                        >
                            <Code2 className="w-3.5 h-3.5" />
                            <span>Start Practicing</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </Link>

                        <Link
                            href="/web-dev"
                            className="w-full sm:w-auto px-5 h-9 rounded-lg border border-border/80 bg-background/60 text-foreground text-xs font-semibold flex items-center justify-center gap-2 hover:bg-muted/60 transition-all"
                        >
                            <BookOpen className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>Browse Axioms</span>
                        </Link>

                        <Link
                            href="https://github.com/shivaydv/Dev-Axioms"
                            target="_blank"
                            className="w-full sm:w-auto px-3.5 h-9 rounded-lg border border-border/80 bg-transparent text-muted-foreground hover:text-foreground text-xs font-semibold flex items-center justify-center gap-2 hover:bg-muted/40 transition-all"
                        >
                            <FaGithub className="w-3.5 h-3.5" />
                            <span>Star</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
