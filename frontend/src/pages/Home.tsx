import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

function Home() {
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
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl">Recent Posts</h1>
          <Link to="/explore">
            <Button className="bg-transparent text-muted-foreground hover:bg-accent-foreground hover:text-white">
              View All <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
