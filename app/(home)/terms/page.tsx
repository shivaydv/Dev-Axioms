import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = {
    title: 'Terms of Service | Dev Axioms',
    description: 'Terms of Service for Dev Axioms.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background border-b border-border/40 border-dashed">
            <main className="max-w-[800px] mx-auto px-6 py-24 md:py-32">
                <Link
                    href="/"
                    className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "mb-8 -ml-4 text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Home
                </Link>

                <div className="space-y-4 mb-16">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-[#FF5A26] block">
                        UPDATED FEB 2026
                    </span>
                    <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">
                        Terms of Service
                    </h1>
                    <p className="text-muted-foreground text-base">
                        The rules matching your use of the Dev Axioms platform.
                    </p>
                </div>

                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-muted-foreground">
                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-foreground tracking-tight">1. Acceptance of Terms</h2>
                        <p className="leading-relaxed">
                            By accessing and using Dev Axioms, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use the platform.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-foreground tracking-tight">2. Open Source Nature</h2>
                        <p className="leading-relaxed">
                            Dev Axioms is an open-source initiative. While the source code may be available under specific open-source licenses (e.g., MIT), the content, questions, articles, and specific platform design assets may be protected by intellectual property laws. Please review the repository's license file for detailed permissions regarding code usage.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-foreground tracking-tight">3. User Conduct</h2>
                        <p className="leading-relaxed">
                            When utilizing our interactive sandboxes, discussion areas, or practice environments, you agree not to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Use the sandboxes to mine cryptocurrency, host malicious payloads, or run intensive background tasks.</li>
                            <li>Submit code or content that violates any laws or infringes on third-party rights.</li>
                            <li>Attempt to disrupt, exploit, or reverse engineer the platform's infrastructure.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-foreground tracking-tight">4. Disclaimer of Warranties</h2>
                        <p className="leading-relaxed">
                            The platform is provided "as is" without any warranties of any kind. While we strive to provide accurate documentation and stable practice environments, we do not guarantee that the service will be uninterrupted, error-free, or completely secure. Technical preparation material is provided for educational purposes and does not guarantee job placement.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-foreground tracking-tight">5. Changes to Terms</h2>
                        <p className="leading-relaxed">
                            We reserve the right to modify these terms at any time. We will post the revised terms on this page, and your continued use of Dev Axioms following such changes indicates your acceptance of the updated terms.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
