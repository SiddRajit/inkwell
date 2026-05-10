import type { CreateProductData, FeedParams } from "@/types/posts"
import { api } from "./api"

export async function getPosts(params: FeedParams) {
  const { data } = await api.get("/posts", { params })
  return data
}

export async function createPost(productData: CreateProductData) {
  const { data } = await api.post("/posts", productData)
  return data
}
