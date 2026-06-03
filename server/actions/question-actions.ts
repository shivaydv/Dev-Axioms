"use server";

import { QuestionFormData } from "@/types/Question";
import { prisma } from "@/db/prisma";
import { generateSlug } from "@/utils/helpers";
import { revalidatePath } from "next/cache";

export async function addQuestion(data: QuestionFormData) {
  try {
    const slug = generateSlug(data.title);

    await prisma.question.create({
      data: {
        title: data.title,
        slug,
        difficulty: data.difficulty ?? "Easy",
        tags: data.tags ?? [],
        content: data.content,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        starterCode: (data.starterCode as any) ?? null,
        solution: data.solution ?? null,
        timeLimit: data.timeLimit ?? 30,
      },
    });

    revalidatePath("/admin/questions");
    revalidatePath("/(home)/practice");

    return { success: true, message: "Question added successfully" };
  } catch (error) {
    console.error("Error adding question:", error);
    return {
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
}

export async function updateQuestion(
  questionId: string,
  data: QuestionFormData,
) {
  try {
    const slug = generateSlug(data.title);

    await prisma.question.update({
      where: { id: questionId },
      data: {
        title: data.title,
        slug,
        difficulty: data.difficulty ?? "Easy",
        tags: data.tags ?? [],
        content: data.content,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        starterCode: (data.starterCode as any) ?? null,
        solution: data.solution ?? null,
        timeLimit: data.timeLimit ?? 30,
      },
    });

    revalidatePath("/admin/questions");
    revalidatePath(`/admin/questions/${questionId}/edit`);
    revalidatePath("/(home)/practice");
    revalidatePath(`/practice/${slug}`);

    return { success: true, message: "Question updated successfully" };
  } catch (error) {
    console.error("Error updating question:", error);
    return {
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
}

export async function deleteQuestion(questionId: string) {
  try {
    await prisma.question.delete({
      where: { id: questionId },
    });

    revalidatePath("/admin/questions");
    revalidatePath("/(home)/practice");

    return { success: true, message: "Question deleted successfully" };
  } catch (error) {
    console.error("Error deleting question:", error);
    return {
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
}
