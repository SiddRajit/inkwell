import { getPosts } from "@/api/posts"
import type { FeedParams } from "@/types/posts"
import { useQuery } from "@tanstack/react-query"

export function usePosts(params: FeedParams) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
    placeholderData: (prev) => prev,
  })
}
