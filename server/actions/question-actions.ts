"use server";

import { QuestionFormData } from "@/types/Question";
import { question } from "@/db";
import { db } from "@/db/drizzle";
import { generateSlug } from "@/utils/helpers";
import { SandpackFiles } from "@codesandbox/sandpack-react";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addQuestion(data: QuestionFormData) {
  try {
    const slug = generateSlug(data.title);

    await db.insert(question).values({
      title: data.title,
      slug,
      difficulty: data.difficulty ?? "Easy",
      tags: data.tags ?? [],
      content: data.content,
      starterCode: (data.starterCode as SandpackFiles) ?? null,
      solution: data.solution ?? null,
      timeLimit: data.timeLimit ?? 30,
    });

    // Revalidate the questions page to show the new question
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

    await db
      .update(question)
      .set({
        title: data.title,
        slug,
        difficulty: data.difficulty ?? "Easy",
        tags: data.tags ?? [],
        content: data.content,
        starterCode: (data.starterCode as SandpackFiles) ?? null,
        solution: data.solution ?? null,
        timeLimit: data.timeLimit ?? 30,
        updatedAt: new Date(),
      })
      .where(eq(question.id, questionId));

    // Revalidate pages that might show this question
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
    await db.delete(question).where(eq(question.id, questionId));

    // Revalidate the questions page to remove the deleted question
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
