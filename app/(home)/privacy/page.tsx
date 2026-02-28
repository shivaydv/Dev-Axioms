import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = {
    title: 'Privacy Policy | Dev Axioms',
    description: 'Privacy Policy for Dev Axioms.',
};

export default function PrivacyPage() {
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
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground text-base">
                        How we handle and protect your data at Dev Axioms.
                    </p>
                </div>

                <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-muted-foreground">
                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-foreground tracking-tight">1. Introduction</h2>
                        <p className="leading-relaxed">
                            Welcome to Dev Axioms. This Privacy Policy explains how we collect, use, and protect your information when you use our platform. Since Dev Axioms is primarily an open-source educational platform, we minimize data collection to only what is necessary to provide you with a seamless learning and practice experience.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-foreground tracking-tight">2. Information We Collect</h2>
                        <p className="leading-relaxed">
                            We may collect minimal information, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Account Information:</strong> If you sign up using GitHub or another provider, we collect your basic profile information (name, email) to create your account.</li>
                            <li><strong>Usage Data:</strong> We may anonymously track page progress, practice completions, and sandbox interactions to improve the learning experience.</li>
                            <li><strong>Code Submissions:</strong> Code you write in the practice sandboxes may be temporarily stored to evaluate test cases or track progress, depending on your account settings.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-foreground tracking-tight">3. How We Use Your Information</h2>
                        <p className="leading-relaxed">
                            Your information is exclusively used to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide and maintain the core functionality of Dev Axioms.</li>
                            <li>Save your progress through documentation and machine coding challenges.</li>
                            <li>Improve platform performance and identify bugs in the practice environments.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-foreground tracking-tight">4. Data Sharing & Third Parties</h2>
                        <p className="leading-relaxed">
                            We do not sell, rent, or trade your personal information. We may share anonymized, aggregated data for analytical purposes. We use trusted third-party services (like GitHub for authentication or database providers) which have their own privacy policies governing their processing of your data.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-medium text-foreground tracking-tight">5. Contact Us</h2>
                        <p className="leading-relaxed">
                            If you have any questions about this Privacy Policy, please open an issue on our GitHub repository or contact the maintainers directly.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
