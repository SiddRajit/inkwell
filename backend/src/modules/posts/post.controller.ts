import { and, eq, ilike, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { Request, Response } from "express";
import { getAuth } from "@clerk/express";

type SortBy = "latest" | "popular" | "trending";

export async function getPosts(req: Request, res: Response) {
  try {
    const { search, category, sortBy, page = "1" } = req.query;
    const limit = 10;
    const offset = (parseInt(page as string) - 1) * limit;

    const feed = await db.query.posts.findMany({
      with: {
        author: true,
        likes: true,
      },
      where: (posts, { and, ilike, eq }) =>
        and(
          search ? ilike(posts.title, `%${search as string}%`) : undefined,
          category ? eq(posts.category, category as string) : undefined,
        ),
      orderBy: (posts, { desc }) => {
        if (sortBy === "popular") {
          return [desc(posts.likeCount)];
        }
        if (sortBy === "trending") {
          return [
            desc(
              sql`${posts.likeCount} / POWER(EXTRACT(EPOCH FROM (NOW() - ${posts.createdAt})) / 3600 + 2, 1.5)`,
            ),
          ];
        }
        return [desc(posts.createdAt)];
      },
      limit,
      offset,
    });

    const { userId } = getAuth(req);

    const enriched = feed.map((post) => ({
      ...post,
      isLikedByMe: userId,
      likes: undefined,
    }));

    res.status(200).json({
      success: true,
      message: "Fetched feed successfully",
      data: enriched,
    });
  } catch (error) {
    console.error("Error fetching feed", error);
    res.status(500).json({
      success: false,
      message: "Failed to get products",
    });
  }
}
