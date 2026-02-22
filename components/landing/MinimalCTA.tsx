"use client";

import Link from "next/link";

export function MinimalCTA() {
    return (
        <section className="py-24 bg-background border-b border-border/40 border-dashed">
            <div className="max-w-[1250px] mx-auto px-6">
                <div className="mb-12 text-center md:text-left">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#FF5A26] mb-4 block">
                       FREE & OPEN SOURCE
                    </span>
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
                        Interview Prep for Developers
                    </h2>
                    <p className="text-muted-foreground text-[15px] max-w-lg mx-auto md:mx-0">
                        Dev Axioms is a free, open-source platform to revise concepts, explore real interview questions, and practice machine coding rounds — without paywalls.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Practice Card */}
                    <div className="rounded-2xl p-8 md:p-12 border border-border bg-foreground text-background shadow-xl">
                        <div className="mb-8">
                            <div className="text-[10px] uppercase tracking-widest font-semibold text-background/60 mb-8 px-4 py-1 bg-background/10 inline-block rounded-md border border-background/20">
                                MACHINE CODING PRACTICE
                            </div>
                            <h3 className="text-2xl font-medium mb-3">Hands-on Practice</h3>
                            <p className="text-sm text-background/60 max-w-xs leading-relaxed">Jump securely into React machine coding rounds right from your browser.</p>
                        </div>
                        {/* <div className="flex items-end gap-2 mb-10">
                            <span className="text-4xl leading-none font-medium -tracking-wider">Start Practicing</span>
                        </div> */}
                        <Link
                            href="/practice"
                            className="flex items-center justify-center w-full md:w-auto md:inline-flex px-8 h-12 bg-background text-foreground rounded-md font-medium text-sm transition-opacity hover:opacity-90"
                        >
                            Explore Questions
                        </Link>
                    </div>

                    {/* Resources Card */}
                    <div className="rounded-2xl p-8 md:p-12 border border-border bg-card shadow-sm">
                        <div className="mb-8">
                            <div className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-8 px-4 py-1 inline-block rounded-md border border-border bg-background">
                                REVISION & RESOURCES
                            </div>
                            <h3 className="text-2xl font-medium text-foreground mb-3">Docs, Questions & Deep-Dive Blogs</h3>
                            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">Quickly revise core web concepts, explore curated interview questions, and read deep-dive blogs explaining complex frontend and system design topics.</p>
                        </div>
                        {/* <div className="flex flex-col gap-2 mb-10 text-foreground">
                            <span className="text-4xl leading-none font-medium -tracking-wider">Explore Docs</span>
                        </div> */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/web-dev/html-css/basic-html"
                                className="flex items-center justify-center w-full md:w-auto md:inline-flex px-8 h-12 bg-foreground text-background rounded-md font-medium text-sm transition-opacity hover:opacity-90"
                            >
                                View Docs
                            </Link>
                            <Link
                                href="/blog"
                                className="flex items-center justify-center w-full md:w-auto md:inline-flex px-8 h-12 bg-background border border-border text-foreground rounded-md font-medium text-sm transition-opacity hover:bg-muted"
                            >
                                View Blogs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
