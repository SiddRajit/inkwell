import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { posts } from "./posts.js";
import { follows } from "./follows.js";
import { likes } from "./likes.js";
import { comments } from "./comments.js";
import { bookmarks } from "./bookmarks.js";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  likes: many(likes),
  comments: many(comments),
  followers: many(follows, { relationName: "followers" }),
  following: many(follows, { relationName: "following" }),
  bookmarks: many(bookmarks),
}));
