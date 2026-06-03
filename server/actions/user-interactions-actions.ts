"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { getUserSession } from "../functions/getUserSession";

// Types for the actions
export interface UserInteractionCounts {
  likesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface LikeActionResult {
  success: boolean;
  isLiked: boolean;
  likesCount: number;
  message?: string;
}

export interface BookmarkActionResult {
  success: boolean;
  isBookmarked: boolean;
  message?: string;
}

// Get user interaction data for a question
export async function getUserInteractionData(
  questionId: string,
): Promise<UserInteractionCounts> {
  try {
    const session = await getUserSession();

    if (!session?.user) {
      const likesCount = await prisma.questionLike.count({
        where: { questionId },
      });
      return { likesCount, isLiked: false, isBookmarked: false };
    }

    const userId = session.user.id;

    const [likesCount, userLike, userBookmark] = await Promise.all([
      prisma.questionLike.count({ where: { questionId } }),
      prisma.questionLike.findFirst({
        where: { userId, questionId },
      }),
      prisma.questionBookmark.findFirst({
        where: { userId, questionId },
      }),
    ]);

    return {
      likesCount,
      isLiked: !!userLike,
      isBookmarked: !!userBookmark,
    };
  } catch (error) {
    console.error("Error getting user interaction data:", error);
    return { likesCount: 0, isLiked: false, isBookmarked: false };
  }
}

// Toggle like action
export async function toggleLike(
  questionId: string,
): Promise<LikeActionResult> {
  try {
    const session = await getUserSession();

    if (!session?.user) {
      return {
        success: false,
        isLiked: false,
        likesCount: 0,
        message: "You must be logged in to like questions",
      };
    }

    const userId = session.user.id;

    const existingLike = await prisma.questionLike.findFirst({
      where: { userId, questionId },
    });

    let isLiked: boolean;

    if (existingLike) {
      await prisma.questionLike.delete({ where: { id: existingLike.id } });
      isLiked = false;
    } else {
      await prisma.questionLike.create({
        data: { userId, questionId },
      });
      isLiked = true;
    }

    const likesCount = await prisma.questionLike.count({
      where: { questionId },
    });

    revalidatePath(`/practice/${questionId}`);
    revalidatePath("/practice");

    return {
      success: true,
      isLiked,
      likesCount,
      message: isLiked ? "Question liked!" : "Question unliked!",
    };
  } catch (error) {
    console.error("Error toggling like:", error);
    return {
      success: false,
      isLiked: false,
      likesCount: 0,
      message: "Failed to update like status",
    };
  }
}

// Toggle bookmark action
export async function toggleBookmark(
  questionId: string,
): Promise<BookmarkActionResult> {
  try {
    const session = await getUserSession();

    if (!session?.user) {
      return {
        success: false,
        isBookmarked: false,
        message: "You must be logged in to bookmark questions",
      };
    }

    const userId = session.user.id;

    const existingBookmark = await prisma.questionBookmark.findFirst({
      where: { userId, questionId },
    });

    let isBookmarked: boolean;

    if (existingBookmark) {
      await prisma.questionBookmark.delete({
        where: { id: existingBookmark.id },
      });
      isBookmarked = false;
    } else {
      await prisma.questionBookmark.create({
        data: { userId, questionId },
      });
      isBookmarked = true;
    }

    revalidatePath(`/practice/${questionId}`);
    revalidatePath("/practice");
    revalidatePath("/profile/bookmarks");

    return {
      success: true,
      isBookmarked,
      message: isBookmarked ? "Question bookmarked!" : "Bookmark removed!",
    };
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return {
      success: false,
      isBookmarked: false,
      message: "Failed to update bookmark status",
    };
  }
}

// Get user's liked questions
export async function getUserLikedQuestions() {
  try {
    const session = await getUserSession();
    if (!session?.user) return [];

    const userId = session.user.id;

    const likedQuestions = await prisma.questionLike.findMany({
      where: { userId },
      include: {
        question: {
          select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
            tags: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return likedQuestions.map((like) => ({
      ...like.question,
      likedAt: like.createdAt,
    }));
  } catch (error) {
    console.error("Error getting user liked questions:", error);
    return [];
  }
}

// Get user's bookmarked questions
export async function getUserBookmarkedQuestions() {
  try {
    const session = await getUserSession();
    if (!session?.user) return [];

    const userId = session.user.id;

    const bookmarkedQuestions = await prisma.questionBookmark.findMany({
      where: { userId },
      include: {
        question: {
          select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
            tags: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return bookmarkedQuestions.map((bookmark) => ({
      ...bookmark.question,
      bookmarkedAt: bookmark.createdAt,
    }));
  } catch (error) {
    console.error("Error getting user bookmarked questions:", error);
    return [];
  }
}

// Get popular questions (most liked)
export async function getPopularQuestions(limit: number = 10) {
  try {
    const popularQuestions = await prisma.question.findMany({
      take: limit,
      include: {
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        likes: { _count: "desc" },
      },
    });

    return popularQuestions.map((q) => ({
      id: q.id,
      title: q.title,
      slug: q.slug,
      difficulty: q.difficulty,
      tags: q.tags,
      createdAt: q.createdAt,
      likesCount: q._count.likes,
    }));
  } catch (error) {
    console.error("Error getting popular questions:", error);
    return [];
  }
}
