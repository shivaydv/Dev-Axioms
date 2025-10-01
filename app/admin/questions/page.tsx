import React, { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { LoadingTable } from "@/components/admin-dashboard/loading-table";
import { QuestionsList } from "@/components/admin-dashboard/questions-list";
import { getAllQuestions } from "@/server/functions/questions";
import { getUserSession } from "@/server/functions/getUserSession";
import { checkIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

const QuestionsPage = async () => {
  const session = await getUserSession();
  const isAdmin = checkIsAdmin(session);
  if (!isAdmin) redirect("/");
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Questions</h1>
          <p className="text-muted-foreground">
            Manage your practice questions and coding challenges
          </p>
        </div>
        <Button asChild>
          <Link href="questions/add">
            <Plus className="mr-2 h-4 w-4" />
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
