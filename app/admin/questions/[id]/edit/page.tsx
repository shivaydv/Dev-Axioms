import { prisma } from "@/db/prisma";
import { notFound, redirect } from "next/navigation";
import { EditQuestionForm } from "@/components/admin-dashboard/edit-question-form";
import { getUserSession } from "@/server/functions/getUserSession";
import { checkIsAdmin } from "@/lib/admin";

interface EditQuestionPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Server component that fetches question data
async function getQuestion(id: string) {
  try {
    const questionData = await prisma.question.findUnique({
      where: { id },
    });
    return questionData ?? null;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw new Error("Failed to fetch question");
  }
}

const EditQuestionPage = async ({ params }: EditQuestionPageProps) => {
  const session = await getUserSession();
  const isAdmin = checkIsAdmin(session);
  if (!isAdmin) redirect("/");

  const { id } = await params;
  const questionData = await getQuestion(id);

  if (!questionData) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Question</h1>
        <p className="text-muted-foreground">
          Update the question details below
        </p>
      </div>

      {/* Edit Form */}
      <EditQuestionForm question={questionData} />
    </div>
  );
};

export default EditQuestionPage;
