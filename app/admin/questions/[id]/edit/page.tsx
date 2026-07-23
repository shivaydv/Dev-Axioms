import { notFound } from "next/navigation";
import { EditQuestionForm } from "@/components/admin-dashboard/edit-question-form";
import { getQuestionById } from "@/server/functions/questions";

interface EditQuestionPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const metadata = {
  title: "Edit Question | Dev Axioms Admin",
  description: "Update question details and starter code.",
};

const EditQuestionPage = async ({ params }: EditQuestionPageProps) => {
  const { id } = await params;
  const questionData = await getQuestionById(id);

  if (!questionData) {
    notFound();
  }

  return <EditQuestionForm question={questionData} />;
};

export default EditQuestionPage;
