import { notFound, redirect } from "next/navigation";
import React from "react";
import PracticeHeader from "@/components/playground/PracticeHeader";
import ResponsivePracticeLayout from "@/components/playground/ResponsivePracticeLayout";
import { getQuestionBySlug } from "@/server/functions/questions";
import { Metadata } from "next";

interface PracticePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PracticePage({ params }: PracticePageProps) {
  const { slug } = await params;
  const question = await getQuestionBySlug(slug);

  if (!question) {
    notFound();
  }

  return (
    <div className="bg-background flex h-screen w-full flex-col">
      <PracticeHeader
        timeLimit={question.timeLimit || 30}
        isSidebarVisible={true}
      />
      <ResponsivePracticeLayout question={question} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: PracticePageProps): Promise<Metadata> {
  const { slug } = await params;
  const question = await getQuestionBySlug(slug);

  if (!question) {
    return {
      title: "Question Not Found",
      description: "The requested practice question could not be found.",
    };
  }

  const title = `${question.title} - Dev Axioms`;
  const description = `Practice coding problems on Dev Axioms. Solve and improve your skills.`;
  const image = `/og/practice/${slug}/image.png`;
  return {
    title,
    description,

    openGraph: {
      title,
      description,
      images: [image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
