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
import { Link } from "@tanstack/react-router"

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
  const postId = post.id as string

  return (
    <Link to="/post/$postId" params={{ postId }}>
      <Card className="w-full max-w-sm text-left transition-transform hover:-translate-y-1 hover:bg-muted/75">
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
    </Link>
  )
}

export default PostCard
