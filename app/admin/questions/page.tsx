import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { LoadingTable } from "@/components/admin-dashboard/loading-table";
import { QuestionsList } from "@/components/admin-dashboard/questions-list";
import { getAllQuestions } from "@/server/functions/questions";

export const metadata = {
  title: "Manage Questions | Dev Axioms Admin",
  description: "Manage practice questions and coding challenges.",
};

const QuestionsPage = async () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Questions</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your practice questions, solutions, and sandbox starter templates.
          </p>
        </div>
        <Button asChild size="sm" className="h-9 text-xs bg-[#FF5A26] text-white hover:bg-[#FF5A26]/90 font-semibold shadow-xs">
          <Link href="/admin/questions/add">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Question
          </Link>
        </Button>
      </div>

      {/* Questions Table */}
      <Suspense fallback={<LoadingTable />}>
        <QuestionsTableWrapper />
      </Suspense>
    </div>
  );
};

// Wrapper component to handle data fetching
async function QuestionsTableWrapper() {
  const questions = await getAllQuestions();
  return <QuestionsList questions={questions} />;
}

export default QuestionsPage;
