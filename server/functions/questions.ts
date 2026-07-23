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
    return await prisma.question.findMany({
      orderBy: { createdAt: "desc" },
    });
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
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching questions by difficulty:", error);
    throw new Error("Failed to fetch questions");
  }
}

export interface GetQuestionsParams {
  difficulty?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export async function getQuestionsFiltered({
  difficulty,
  search,
  page = 1,
  limit = 10,
}: GetQuestionsParams) {
  try {
    const where: any = {};

    if (difficulty && difficulty !== "All" && ["Easy", "Medium", "Hard"].includes(difficulty)) {
      where.difficulty = difficulty;
    }

    if (search && search.trim() !== "") {
      const query = search.trim();
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { tags: { hasSome: [query.toLowerCase(), query] } },
      ];
    }

    const skip = (page - 1) * limit;

    const [questions, totalCount] = await Promise.all([
      prisma.question.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.question.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit) || 1;

    return {
      questions,
      totalCount,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error in getQuestionsFiltered:", error);
    return {
      questions: [],
      totalCount: 0,
      totalPages: 1,
      currentPage: 1,
    };
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
