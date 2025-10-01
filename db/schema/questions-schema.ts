import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  jsonb,
  uuid,
  integer,
} from "drizzle-orm/pg-core";
import type { SandpackFiles } from "@codesandbox/sandpack-react";

export const difficultyEnum = pgEnum("difficulty", ["Easy", "Medium", "Hard"]);

export const question = pgTable("question", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  difficulty: difficultyEnum("difficulty").notNull().default("Easy"),
  tags: text("tags").array().notNull().default([]),
  content: text("content").notNull(),
  starterCode: jsonb("starter_code")
    .$type<SandpackFiles | null>()
    .default(null),
  solution: text("solution"),
  timeLimit: integer("time_limit").notNull().default(30), // in minutes
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
