import PostCard from "@/components/app/PostCard"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePosts } from "@/hooks/usePosts"
import type { Post } from "@/types/posts"
import { Link } from "@tanstack/react-router"
import { ArrowRight, Loader2 } from "lucide-react"

function Home() {
  const { data, isLoading, error } = usePosts({ sortBy: "latest", page: 1 })
  const posts = data?.data ?? []
  console.log(posts)

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

  return (
    <div className="min-h-full p-15 text-center">
      <div className="mb-7">
        <h1 className="mb-4 font-serif text-6xl font-bold">
          Stories, ideas & <br />
          perspectives
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Discover thoughtful writing on technology, design, and the craft ofd
          building things that matter.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/explore">
            <Button className="bg-primary text-white" size="lg">
              Start Reading
            </Button>
          </Link>
          <Link to="/write">
            <Button
              className="border border-secondary-foreground bg-transparent text-white hover:bg-accent-foreground"
              size="lg"
            >
              Write a Post
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-serif text-2xl">Recent Posts</h1>
          <Link to="/explore">
            <Button className="bg-transparent text-muted-foreground hover:bg-accent-foreground hover:text-white">
              View All <ArrowRight />
            </Button>
          </Link>
        </div>
        {posts.length === 0 ? (
          <Card>
            <CardContent></CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
