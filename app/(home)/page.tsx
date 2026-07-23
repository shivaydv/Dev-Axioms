import React from "react";
import { MinimalHero } from "@/components/landing/MinimalHero";
import { StorySection } from "@/components/landing/StorySection";
import { BentoFeatures } from "@/components/landing/BentoFeatures";
import { LearningPath } from "@/components/landing/LearningPath";
import { MinimalCTA } from "@/components/landing/MinimalCTA";
import Footer from "@/components/landing/Footer";

const Page = async () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <main className="flex flex-col">
        {/* Hero Section with Interactive Workspace Preview */}
        <MinimalHero />

        {/* Narrative Storytelling Arc: The Shift */}
        <StorySection />

        {/* Raycast / Vercel Bento Grid for Platform Capabilities */}
        <BentoFeatures />

        {/* 3-Step Preparation Flywheel */}
        <LearningPath />

        {/* High-Conversion Closing Call to Action */}
        <MinimalCTA />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
};

export default Page;
