import type { Post } from "@/types/posts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Badge } from "../ui/badge"
import LikeButton from "./LikeButton"

interface PostCardProps {
  post: Post
}

function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt)
  const options = {
    month: "long",
    day: "2-digit",
    year: "numeric",
  } as const
  const createdAt = new Intl.DateTimeFormat("en-US", options).format(date)

  return (
    <Card className="w-full max-w-sm text-left">
      <CardHeader>
        <Badge className="text-white">
          {post.category[0].toLocaleUpperCase() + post.category.slice(1)}
        </Badge>
        <CardTitle className="mt-2 text-left font-serif text-3xl">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="line-clamp-3 overflow-hidden text-muted-foreground">
          {post.content}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <p>{post.author.username}</p>
            <p>•</p>
            <p>{createdAt}</p>
          </div>
          <div className="flex">
            <LikeButton likeCount={post.likeCount} />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default PostCard
