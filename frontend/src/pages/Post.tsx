import { useUser } from "@clerk/react"
import { Link, useParams } from "@tanstack/react-router"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx"
import { getInitials } from "../utils/avatar.ts"
import { usePost } from "@/hooks/usePosts.ts"
import { Alert, AlertDescription } from "@/components/ui/alert.tsx"

const Article = () => {
  const { postId } = useParams({ from: "/post/$postId" })
  const { user } = useUser()
  const { data: post, isLoading, error } = usePost(postId)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-14 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Something went wrong. Please refresh the page.
        </AlertDescription>
      </Alert>
    )
  }

  if (!post) return null

  const isOwner = user?.id === post.authorId
  console.log("createdAt raw:", post.createdAt, typeof post.createdAt)
  console.log(user)

  return (
    <div className="flex h-full w-full flex-col px-30 py-10">
      <Link to="/" className="flex items-center gap-1 text-muted-foreground">
        <ArrowLeft className="size-5" /> Back
      </Link>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{getInitials(post.author.username)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.author.username}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
