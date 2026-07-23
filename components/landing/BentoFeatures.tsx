"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
    Code2,
    BookOpen,
    Layers,
    ArrowRight,
    CheckCircle2
} from "lucide-react";
import { FaGithub, FaTerminal } from "react-icons/fa6";

export function BentoFeatures() {
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
                        PLATFORM CAPABILITIES
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-4"
                    >
                        Four Pillars of Dev Axioms
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed"
                    >
                        Designed for maximum signal-to-noise ratio so you focus only on what interviewers test.
                    </motion.p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-5xl mx-auto">
                    {/* Card 1: Curated Practice Bank (7 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="md:col-span-7 rounded-2xl border border-border/80 bg-card/40 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between group hover:border-border transition-all shadow-sm"
                    >
                        <div className="mb-6">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20">
                                <Code2 className="w-4 h-4 text-[#FF5A26]" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">Curated Questions</span>
                            <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                                Practice Question Bank
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Categorized by difficulty (Easy, Medium, Hard) and tags. Practice DOM manipulation, state management, and polyfill challenges.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-background/80 border border-border/50 text-center text-xs">
                            <div>
                                <span className="text-[10px] text-emerald-500 font-bold block">EASY</span>
                                <span className="font-semibold text-foreground">Fundamentals</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-yellow-500 font-bold block">MEDIUM</span>
                                <span className="font-semibold text-foreground">Polyfills & DOM</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-red-500 font-bold block">HARD</span>
                                <span className="font-semibold text-foreground">Machine Coding</span>
                            </div>
                        </div>

                        <Link href="/practice" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                            <span>Open Practice Arena</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </motion.div>

                    {/* Card 2: Web Dev Axioms (5 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="md:col-span-5 rounded-2xl border border-border/80 bg-card/40 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between group hover:border-border transition-all shadow-sm"
                    >
                        <div className="mb-6">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20">
                                <BookOpen className="w-4 h-4 text-[#FF5A26]" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">MDN-Level Notes</span>
                            <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                                Web Dev Axioms
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Distilled documentation for HTML & CSS, JavaScript, React, and Next.js built for instant revision before interviews.
                            </p>
                        </div>

                        <div className="space-y-2 text-xs">
                            {["HTML & CSS Layouts", "JavaScript Event Loop", "React Fiber & Hooks", "Next.js App Router"].map((topic, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-background/60 border border-border/40 font-medium text-foreground">
                                    <span className="flex items-center gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5A26]" />
                                        <span>{topic}</span>
                                    </span>
                                </div>
                            ))}
                        </div>

                        <Link href="/web-dev" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                            <span>Browse Web Dev Axioms</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </motion.div>

                    {/* Card 3: Architecture Blogs (5 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="md:col-span-5 rounded-2xl border border-border/80 bg-card/40 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between group hover:border-border transition-all shadow-sm"
                    >
                        <div className="mb-6">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20">
                                <Layers className="w-4 h-4 text-[#FF5A26]" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">Deep-Dive System Design</span>
                            <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                                System Architecture Blogs
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Detailed technical breakdowns on React Streaming, Token Rotation, and Signed URLs.
                            </p>
                        </div>

                        <div className="p-3 rounded-xl bg-background/80 border border-border/50 text-xs font-mono space-y-1.5 text-slate-300">
                            <div>• React Streaming & SSR</div>
                            <div>• Token Rotation Architecture</div>
                            <div>• Signed vs Unsigned URLs</div>
                        </div>

                        <Link href="/blog" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                            <span>Read Architecture Blogs</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </motion.div>

                    {/* Card 4: Open Source (7 Cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="md:col-span-7 rounded-2xl border border-border/80 bg-card/40 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between group hover:border-border transition-all shadow-sm"
                    >
                        <div className="mb-6">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20">
                                <FaGithub className="w-4 h-4 text-[#FF5A26]" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 block">Community Powered</span>
                            <h3 className="text-xl font-bold text-foreground mb-2 tracking-tight">
                                100% Free & Open Source
                            </h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Dev Axioms is open source. Contribute new interview questions, add documentation, or refine existing axioms on GitHub.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-background/80 border border-border/50 text-xs">
                            <FaTerminal className="w-3.5 h-3.5 text-[#FF5A26] shrink-0" />
                            <span className="text-muted-foreground">Built by developers, for developers. No paywalls or hidden subscriptions.</span>
                        </div>

                        <Link href="https://github.com/shivaydv/Dev-Axioms" target="_blank" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                            <span>View Repository on GitHub</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
