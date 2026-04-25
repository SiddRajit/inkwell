import { UserJSON } from "@clerk/express";
import { users } from "../../db/schema/users.js";
import { db } from "../../db/index.js";
import { eq, sql } from "drizzle-orm";
import { EmailAddressJSON } from "@clerk/express";

interface UpsertUserData {
  id: string;
  username: string;
  email: string;
  bio?: string | null;
}

export async function upsertUser(data: UpsertUserData) {
  await db
    .insert(users)
    .values({
      id: data.id,
      username: data.username,
      email: data.email,
      bio: data.bio ?? null,
    })
    .onConflictDoUpdate({
      target: users.id,
      set: {
        username: data.username,
        email: data.email,
      },
    });
}

export async function deleteUser(clerkId: string): Promise<void> {
  await db.delete(users).where(eq(users.id, clerkId));
}
