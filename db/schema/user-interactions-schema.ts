import {
  pgTable,
  text,
  timestamp,
  uuid,
  unique,
  index,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { question } from "./questions-schema";

// User likes table
export const questionLike = pgTable(
  "question_like",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    questionId: uuid("question_id")
      .notNull()
      .references(() => question.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    // Composite unique constraint to prevent duplicate likes
    userQuestionUnique: unique("user_question_like_unique").on(
      table.userId,
      table.questionId,
    ),
    // Indexes for performance
    userIdIdx: index("question_like_user_id_idx").on(table.userId),
    questionIdIdx: index("question_like_question_id_idx").on(table.questionId),
  }),
);

// User bookmarks table
export const questionBookmark = pgTable(
  "question_bookmark",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    questionId: uuid("question_id")
      .notNull()
      .references(() => question.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    // Composite unique constraint to prevent duplicate bookmarks
    userQuestionUnique: unique("user_question_bookmark_unique").on(
      table.userId,
      table.questionId,
    ),
    // Indexes for performance
    userIdIdx: index("question_bookmark_user_id_idx").on(table.userId),
    questionIdIdx: index("question_bookmark_question_id_idx").on(
      table.questionId,
    ),
  }),
);

export const UserInteractionsSchema = {
  questionLike,
  questionBookmark,
};
