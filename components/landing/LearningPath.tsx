"use client";

import { motion } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Revise Core Concepts",
        description: "Quickly revise HTML, CSS, JavaScript, React, and more with focused, MDN-style documentation built for interview revision.",
        iconPath: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 9l3 3-3 3" />
                <path d="M13 15h2" />
            </svg>
        )
    },
    {
        title: "Understand Architecture",
        description: "Simple, diagram-driven blogs that break down complex architectures and real-world frontend patterns.",
        iconPath: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        )
    },
    {
        title: "Machine Coding Rounds",
        description: "Solve real React machine coding problems in a live sandbox with editor, console, preview, and timer tracking.",
        iconPath: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        )
    }
];

export function LearningPath() {
    return (
        <section className="py-24 bg-background border-b border-border/40 border-dashed">
            <div className="max-w-[1250px] mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-[#FF5A26] mb-4 block">
                            INTERVIEW PREPARATION FLOW
                        </span>
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-foreground">
                        Revise. Practice. <br className="hidden md:block" />Crack Developer Interviews.
                        </h2>
                        <p className="text-muted-foreground text-[15px] max-w-sm leading-relaxed">
                            A clear path to prepare for developer interviews without jumping across multiple platforms.
                        </p>
                    </div>
                    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card rounded-xl p-8 border border-border flex flex-col items-center text-center shadow-sm"
                        >
                            <div className="w-full h-32 mb-6 flex items-center justify-center text-foreground/80 opacity-60 bg-muted/30 rounded-lg border border-border">
                                {feature.iconPath}
                            </div>
                            <h3 className="font-medium text-foreground mb-3 text-[15px]">{feature.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed max-w-[250px]">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
