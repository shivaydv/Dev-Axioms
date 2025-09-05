"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import questionsData from "@/data/practice-questions.json";
import PracticeHeader from "@/components/playground/PracticeHeader";
import { Question } from "@/types/Question";
import ResponsivePracticeLayout from "@/components/playground/ResponsivePracticeLayout";
import { MobileViewProvider } from "@/store/MobileViewStore";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    const questionId = params?.slug as string;
    const foundQuestion = questionsData.questions.find(
      (q) => q.id === questionId,
    ) as Question;
    if (foundQuestion) setQuestion(foundQuestion);
    else router.push("/practice");
  }, [params, router]);

  if (!question) return null;

  return (
    <MobileViewProvider>
      <div className="bg-background flex h-screen w-full flex-col">
        <PracticeHeader
          timeLimit={question.timeLimit}
          isSidebarVisible={true}
        />
        <ResponsivePracticeLayout question={question} />
      </div>
    </MobileViewProvider>
  );
}
