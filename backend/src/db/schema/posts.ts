import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { relations } from "drizzle-orm";
import { likes } from "./likes.js";
import { comments } from "./comments.js";
import { bookmarks } from "./bookmarks.js";

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  authorId: text("author_id")
    .references(() => users.id)
    .notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  likeCount: integer("like_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  likes: many(likes),
  comments: many(comments),
  bookmarks: many(bookmarks),
}));
