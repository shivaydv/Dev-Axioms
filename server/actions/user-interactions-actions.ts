"use server";

import { db } from "@/db/drizzle";
import { questionLike, questionBookmark, question } from "@/db";
import { eq, and, sql, desc } from "drizzle-orm";
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
      // Get total likes count for non-authenticated users
      const likesResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(questionLike)
        .where(eq(questionLike.questionId, questionId));

      return {
        likesCount: Number(likesResult[0]?.count || 0),
        isLiked: false,
        isBookmarked: false,
      };
    }

    const userId = session.user.id;

    // Get likes count and user's interaction status in parallel
    const [likesResult, userLike, userBookmark] = await Promise.all([
      db
        .select({ count: sql<number>`count(*)` })
        .from(questionLike)
        .where(eq(questionLike.questionId, questionId)),
      db
        .select()
        .from(questionLike)
        .where(
          and(
            eq(questionLike.userId, userId),
            eq(questionLike.questionId, questionId),
          ),
        )
        .limit(1),
      db
        .select()
        .from(questionBookmark)
        .where(
          and(
            eq(questionBookmark.userId, userId),
            eq(questionBookmark.questionId, questionId),
          ),
        )
        .limit(1),
    ]);

    return {
      likesCount: Number(likesResult[0]?.count || 0),
      isLiked: userLike.length > 0,
      isBookmarked: userBookmark.length > 0,
    };
  } catch (error) {
    console.error("Error getting user interaction data:", error);
    return {
      likesCount: 0,
      isLiked: false,
      isBookmarked: false,
    };
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

    // Check if user already liked the question
    const existingLike = await db
      .select()
      .from(questionLike)
      .where(
        and(
          eq(questionLike.userId, userId),
          eq(questionLike.questionId, questionId),
        ),
      )
      .limit(1);

    let isLiked: boolean;

    if (existingLike.length > 0) {
      // Unlike: Remove the like
      await db
        .delete(questionLike)
        .where(
          and(
            eq(questionLike.userId, userId),
            eq(questionLike.questionId, questionId),
          ),
        );
      isLiked = false;
    } else {
      // Like: Add the like
      await db.insert(questionLike).values({
        userId,
        questionId,
      });
      isLiked = true;
    }

    // Get updated likes count
    const likesResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(questionLike)
      .where(eq(questionLike.questionId, questionId));

    const likesCount = Number(likesResult[0]?.count || 0);

    // Revalidate paths that might show this data
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

    // Check if user already bookmarked the question
    const existingBookmark = await db
      .select()
      .from(questionBookmark)
      .where(
        and(
          eq(questionBookmark.userId, userId),
          eq(questionBookmark.questionId, questionId),
        ),
      )
      .limit(1);

    let isBookmarked: boolean;

    if (existingBookmark.length > 0) {
      // Remove bookmark
      await db
        .delete(questionBookmark)
        .where(
          and(
            eq(questionBookmark.userId, userId),
            eq(questionBookmark.questionId, questionId),
          ),
        );
      isBookmarked = false;
    } else {
      // Add bookmark
      await db.insert(questionBookmark).values({
        userId,
        questionId,
      });
      isBookmarked = true;
    }

    // Revalidate paths that might show this data
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
    if (!session?.user) {
      return [];
    }

    const userId = session.user.id;

    const likedQuestions = await db
      .select({
        id: question.id,
        title: question.title,
        slug: question.slug,
        difficulty: question.difficulty,
        tags: question.tags,
        createdAt: question.createdAt,
        likedAt: questionLike.createdAt,
      })
      .from(questionLike)
      .innerJoin(question, eq(questionLike.questionId, question.id))
      .where(eq(questionLike.userId, userId))
      .orderBy(desc(questionLike.createdAt));

    return likedQuestions;
  } catch (error) {
    console.error("Error getting user liked questions:", error);
    return [];
  }
}

// Get user's bookmarked questions
export async function getUserBookmarkedQuestions() {
  try {
    const session = await getUserSession();

    if (!session?.user) {
      return [];
    }

    const userId = session.user.id;

    const bookmarkedQuestions = await db
      .select({
        id: question.id,
        title: question.title,
        slug: question.slug,
        difficulty: question.difficulty,
        tags: question.tags,
        createdAt: question.createdAt,
        bookmarkedAt: questionBookmark.createdAt,
      })
      .from(questionBookmark)
      .innerJoin(question, eq(questionBookmark.questionId, question.id))
      .where(eq(questionBookmark.userId, userId))
      .orderBy(desc(questionBookmark.createdAt));

    return bookmarkedQuestions;
  } catch (error) {
    console.error("Error getting user bookmarked questions:", error);
    return [];
  }
}

// Get popular questions (most liked)
export async function getPopularQuestions(limit: number = 10) {
  try {
    const popularQuestions = await db
      .select({
        id: question.id,
        title: question.title,
        slug: question.slug,
        difficulty: question.difficulty,
        tags: question.tags,
        createdAt: question.createdAt,
        likesCount: sql<number>`count(${questionLike.id})`,
      })
      .from(question)
      .leftJoin(questionLike, eq(question.id, questionLike.questionId))
      .groupBy(question.id)
      .orderBy(desc(sql`count(${questionLike.id})`))
      .limit(limit);

    return popularQuestions.map((q) => ({
      ...q,
      likesCount: Number(q.likesCount),
    }));
  } catch (error) {
    console.error("Error getting popular questions:", error);
    return [];
  }
}
