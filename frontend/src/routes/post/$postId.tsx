import Article from "@/pages/Post"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/post/$postId")({
  component: Article,
})
