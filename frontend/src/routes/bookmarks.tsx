import Bookmarks from "@/pages/Bookmarks"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/bookmarks")({
  component: Bookmarks,
})
