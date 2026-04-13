import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { posts } from "./posts.js";
import { users } from "./users.js";
import { relations } from "drizzle-orm";

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey(),
  postId: uuid("post_id").references(() => posts.id),
  authorId: uuid("author_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const commentsRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  replies: many(comments),
}));
