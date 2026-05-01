import type { Post } from "@/types/posts"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

interface PostCardProps {
  post: Post
}

function PostCard({ post }: PostCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <Badge className="text-white">
          {post.category[0].toLocaleUpperCase() + post.category.slice(1)}
        </Badge>
        <CardTitle className="mt-2 text-left font-serif text-2xl">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>{post.content}</div>
      </CardContent>
    </Card>
  )
}

export default PostCard
