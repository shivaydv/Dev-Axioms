import { question } from "@/db";
import { db } from "@/db/drizzle";
import { desc, eq } from "drizzle-orm";

export async function getQuestionById(questionId: string) {
  try {
    const questionData = await db
      .select()
      .from(question)
      .where(eq(question.id, questionId))
      .limit(1);

    if (!questionData || questionData.length === 0) {
      return null;
    }

    return questionData[0];
  } catch (error) {
    console.error("Error fetching question:", error);
    throw new Error("Failed to fetch question");
  }
}

export async function getQuestionBySlug(slug: string) {
  try {
    const questionData = await db
      .select()
      .from(question)
      .where(eq(question.slug, slug))
      .limit(1);

    if (!questionData || questionData.length === 0) {
      return null;
    }

    return questionData[0];
  } catch (error) {
    console.error("Error fetching question by slug:", error);
    throw new Error("Failed to fetch question");
  }
}

export async function getAllQuestions() {
  try {
    const questions = await db.select().from(question);
    return questions;
  } catch (error) {
    console.error("Error fetching all questions:", error);
    throw new Error("Failed to fetch questions");
  }
}

export async function getQuestionsByDifficulty(difficulty?: string) {
  try {
    if (!difficulty || difficulty === "All") {
      return await getAllQuestions();
    }

    // Type guard to ensure difficulty is a valid enum value
    if (
      difficulty !== "Easy" &&
      difficulty !== "Medium" &&
      difficulty !== "Hard"
    ) {
      return await getAllQuestions();
    }

    const questions = await db
      .select()
      .from(question)
      .where(eq(question.difficulty, difficulty));

    return questions;
  } catch (error) {
    console.error("Error fetching questions by difficulty:", error);
    throw new Error("Failed to fetch questions");
  }
}

export async function getQuestionsCount() {
  try {
    const questions = await db.select().from(question);
    return questions.length;
  } catch (error) {
    console.error("Error fetching questions count:", error);
    return 0;
  }
}
