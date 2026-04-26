import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { Pen } from "lucide-react"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react"

function Navbar() {
  return (
    <div className="flex w-full items-center justify-between">
      {/* Left */}
      <div className="flex items-center justify-between gap-5">
        <Link to="/">
          <p className="font- text-2xl font-bold tracking-wider">Inkwell</p>
        </Link>
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-mdeium rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="font-mdeium rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Explore
          </Link>
          <Link
            to="/bookmarks"
            className="font-mdeium rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Bookmarks
          </Link>
        </div>
      </div>
      {/* Right */}
      <div className="flex gap-4">
        <Link to="/write">
          <Button className="bg-primary text-white">
            <Pen />
            Write
          </Button>
        </Link>

        <Show when="signed-out">
          <Button className="bg-blue-600 text-white transition-colors hover:bg-blue-500">
            <SignInButton />
          </Button>
          <div className="rounded-sm px-3 py-2 text-sm transition-colors hover:bg-gray-700">
            <SignUpButton />
          </div>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  )
}

export default Navbar
