import Explore from "@/pages/Explore"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod"

const feedSearchSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  sortBy: z.enum(["latest", "popular", "trending"]).optional(),
  page: z.number().optional().default(1),
})

export const Route = createFileRoute("/explore")({
  component: Explore,
  validateSearch: feedSearchSchema,
})
