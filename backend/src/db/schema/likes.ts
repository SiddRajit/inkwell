import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { posts } from "./posts.js";
import { relations } from "drizzle-orm";

export const likes = pgTable(
  "likes",
  {
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
    postId: uuid("post_id")
      .references(() => posts.id)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.postId] }),
  }),
);

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
}));
