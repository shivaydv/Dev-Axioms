"use client";

import { motion } from "motion/react";
import { Check, X, ShieldAlert } from "lucide-react";
import { FaTerminal } from "react-icons/fa6";

export function StorySection() {
    return (
        <section className="py-20 bg-background border-b border-border/40 border-dashed relative">
            <div className="max-w-6xl mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-[11px] font-bold uppercase tracking-widest text-[#FF5A26] mb-3 block"
                    >
                        THE PARADIGM SHIFT
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-4"
                    >
                        Traditional Prep is Fragmented. <br />
                        <span className="text-muted-foreground font-medium">Dev Axioms Consolidates It.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed"
                    >
                        Most candidates struggle in interviews because they memorize answers from scattered tabs instead of building deep mental models.
                    </motion.p>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
                    {/* Scattered Way */}
                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="rounded-2xl border border-border/60 bg-card/20 p-7 flex flex-col justify-between"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/60 text-muted-foreground text-xs font-semibold mb-6">
                                <ShieldAlert className="w-3.5 h-3.5" />
                                <span>The Scattered Way</span>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                                Memorizing Code Syntax
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                                Bouncing between medium articles, video playlists, and paywalled sites. When an interviewer introduces a minor variation, memorized solutions fall apart.
                            </p>

                            <ul className="space-y-3 text-xs text-muted-foreground">
                                <li className="flex items-start gap-2.5">
                                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                    <span>Scattered across unorganized blog posts and repositories.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                    <span>No structured difficulty progression or question tags.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                    <span>Paywalls for full interview breakdowns.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* The Dev Axioms Way */}
                    <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="rounded-2xl border border-[#FF5A26]/40 bg-card/60 p-7 flex flex-col justify-between shadow-lg relative"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6">
                                <FaTerminal className="w-3 h-3 text-[#FF5A26]" />
                                <span>The Dev Axioms Way</span>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                                First-Principles Mental Models
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                                Learn the underlying axioms of web development. Build lasting technical confidence that generalizes across any interview question.
                            </p>

                            <ul className="space-y-3 text-xs text-foreground font-medium">
                                <li className="flex items-start gap-2.5">
                                    <Check className="w-4 h-4 text-[#FF5A26] shrink-0 mt-0.5" />
                                    <span>Distilled MDN-grade documentation for rapid concept revision.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Check className="w-4 h-4 text-[#FF5A26] shrink-0 mt-0.5" />
                                    <span>Curated practice bank categorized by Easy, Medium, and Hard.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Check className="w-4 h-4 text-[#FF5A26] shrink-0 mt-0.5" />
                                    <span>100% Free & Open Source — zero paywalls forever.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
