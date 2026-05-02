import { and, eq, ilike, sql } from "drizzle-orm";
import { db } from "../../db/index.js";
import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { posts } from "../../db/schema/posts.js";

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
      isLikedByMe: userId
        ? post.likes.some((like) => like.userId === userId)
        : false,
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

export async function getPost(req: Request, res: Response) {
  try {
    const { id } = req.params as { id: string };
    const post = await db.select().from(posts).where(eq(posts.id, id));
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User unauthorized",
      });
    }

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fetched post successfully",
      data: post,
    });
  } catch (error) {}
}

export async function createPost(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User unauthorized",
      });
      return;
    }

    const { title, content, category } = req.body || {};

    if (!title || !content || !category) {
      res.status(400).json({
        success: false,
        message: "Title, content, category are required",
      });
      return;
    }

    const post = await db.insert(posts).values({
      authorId: userId,
      title,
      content,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Created post successfully",
      data: post,
    });
  } catch (error) {
    console.error("Error creating product: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
}
