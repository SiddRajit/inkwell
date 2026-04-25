import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { posts } from "./posts.js";
import { relations } from "drizzle-orm";

export const bookmarks = pgTable(
  "bookmarks",
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

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [bookmarks.postId],
    references: [posts.id],
  }),
}));
