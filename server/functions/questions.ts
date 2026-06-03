import { prisma } from "@/db/prisma";
import { cache } from "react";

export const getQuestionById = cache(async (questionId: string) => {
  try {
    const questionData = await prisma.question.findUnique({
      where: { id: questionId },
    });
    return questionData ?? null;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw new Error("Failed to fetch question");
  }
});

export const getQuestionBySlug = cache(async (slug: string) => {
  try {
    const questionData = await prisma.question.findUnique({
      where: { slug },
    });
    return questionData ?? null;
  } catch (error) {
    console.error("Error fetching question by slug:", error);
    throw new Error("Failed to fetch question");
  }
});

export async function getAllQuestions() {
  try {
    return await prisma.question.findMany();
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

    if (
      difficulty !== "Easy" &&
      difficulty !== "Medium" &&
      difficulty !== "Hard"
    ) {
      return await getAllQuestions();
    }

    return await prisma.question.findMany({
      where: { difficulty },
    });
  } catch (error) {
    console.error("Error fetching questions by difficulty:", error);
    throw new Error("Failed to fetch questions");
  }
}

export async function getQuestionsCount() {
  try {
    return await prisma.question.count();
  } catch (error) {
    console.error("Error fetching questions count:", error);
    return 0;
  }
}
