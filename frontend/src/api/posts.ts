import type { FeedParams } from "@/types/posts"
import { api } from "./api"

export async function getPosts(params: FeedParams) {
  const { data } = await api.get("/posts", { params })
  return data
}
