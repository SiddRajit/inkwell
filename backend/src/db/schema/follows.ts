import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users.js";
import { relations } from "drizzle-orm";

export const follows = pgTable(
  "follows",
  {
    followerId: text("follower_id")
      .references(() => users.id)
      .notNull(),
    followingId: text("following_id")
      .references(() => users.id)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.followerId, t.followingId] }),
  }),
);

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.followerId],
    references: [users.id],
    relationName: "followers",
  }),
  following: one(users, {
    fields: [follows.followingId],
    references: [users.id],
    relationName: "following",
  }),
}));
