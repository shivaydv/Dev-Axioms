"use server";

import { QuestionFormData } from "@/app/admin/add-question/page";
import { question } from "@/db";
import { db } from "@/db/drizzle";
import { generateSlug } from "@/utils/helpers";
import { SandpackFiles } from "@codesandbox/sandpack-react";

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
    });

    return { success: true, message: "Question added successfully" };
  } catch (error) {
    console.error("Error adding question:", error);
    return {
      success: false,
      message: (error as Error).message || "Something went wrong",
    };
  }
}
