import React from "react";
import { MinimalHero } from "@/components/landing/MinimalHero";
import { BentoFeatures } from "@/components/landing/BentoFeatures";
import { LearningPath } from "@/components/landing/LearningPath";
import { MinimalCTA } from "@/components/landing/MinimalCTA";
import Footer from "@/components/landing/Footer";

const Page = async () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <main className="flex flex-col">
        {/* Minimal Hero with Redesigned Professional Editor */}
        <MinimalHero />

        {/* Modern Bento Grid for Key Features */}
        <BentoFeatures />

        {/* Interactive Timeline for Mastery Journey */}
        <LearningPath />

        {/* Strategic Call to Action */}
        <MinimalCTA />

        <Footer />
      </main>
    </div>
  );
};

export default Page;
