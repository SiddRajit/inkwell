import type { User } from "./user"

export interface FeedParams {
  search?: string
  category?: string
  sortBy?: "popular" | "trending" | "latest"
  page?: number
}

export interface Post {
  id: string
  createdAt: Date
  authorId: string
  title: string
  content: string
  category: string
  likeCount: number
  author: User
}
