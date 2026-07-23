"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, BookOpen, Code2, Layers } from "lucide-react";

const steps = [
    {
        number: "01",
        tag: "STEP ONE",
        title: "Revise Concept Axioms",
        description: "Quickly review MDN-level notes on HTML, CSS, JavaScript, React, and Next.js before your interview.",
        href: "/web-dev",
        actionText: "Read Axioms",
        icon: <BookOpen className="w-4 h-4 text-[#FF5A26]" />
    },
    {
        number: "02",
        tag: "STEP TWO",
        title: "Solve Practice Questions",
        description: "Sharpen problem-solving skills with Easy, Medium, and Hard curated interview questions.",
        href: "/practice",
        actionText: "Start Practice",
        icon: <Code2 className="w-4 h-4 text-[#FF5A26]" />
    },
    {
        number: "03",
        tag: "STEP THREE",
        title: "Understand System Design",
        description: "Explore deep-dive blogs breaking down token rotation, SSR streaming, and production architecture.",
        href: "/blog",
        actionText: "Read Architecture",
        icon: <Layers className="w-4 h-4 text-[#FF5A26]" />
    }
];

export function LearningPath() {
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
                        THE PREPARATION WORKFLOW
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-4"
                    >
                        The 3-Step Preparation Engine
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed"
                    >
                        A systematic approach designed to give you clarity and confidence in tech interviews.
                    </motion.p>
                </div>

                {/* 3 Step Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="rounded-2xl border border-border/80 bg-card/40 backdrop-blur-md p-6 flex flex-col justify-between group hover:border-border transition-all shadow-sm relative"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-5 pb-3 border-b border-border/50">
                                    <div className="flex items-center gap-2.5">
                                        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
                                            {step.icon}
                                        </div>
                                        <span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                                            {step.tag}
                                        </span>
                                    </div>
                                    <span className="text-xl font-bold text-muted-foreground/30 font-mono">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
                                    {step.title}
                                </h3>

                                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                                    {step.description}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-border/40 flex items-center justify-between">
                                <Link
                                    href={step.href}
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground group-hover:text-primary transition-colors"
                                >
                                    <span>{step.actionText}</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
