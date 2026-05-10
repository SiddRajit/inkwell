import { createPost, getPosts } from "@/api/posts"
import type { FeedParams } from "@/types/posts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export function usePosts(params: FeedParams) {
  return useQuery({
    queryKey: ["posts", params],
    queryFn: () => getPosts(params),
    placeholderData: (prev) => prev,
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  })
}
