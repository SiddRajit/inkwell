import Layout from "@/pages/Layout"
import { ClerkProvider } from "@clerk/clerk-react"
import { createRootRoute } from "@tanstack/react-router"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export const Route = createRootRoute({
  component: () => (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Layout />
    </ClerkProvider>
  ),
})
