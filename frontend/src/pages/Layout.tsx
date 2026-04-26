import { useApiInterceptor } from "@/api/api"
import { ClerkSync } from "@/components/ClerkSync"
import Navbar from "@/components/Navbar"
import { Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

function Layout() {
  useApiInterceptor()
  return (
    <div>
      <div className="flex gap-2 p-2">
        <Navbar />
      </div>
      <hr />
      <ClerkSync />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  )
}

export default Layout
