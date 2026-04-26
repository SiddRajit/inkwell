import Explore from "@/pages/Explore"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/explore")({
  component: Explore,
})
