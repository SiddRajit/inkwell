import { useApiInterceptor } from "@/api/api"
import { ClerkSync } from "@/components/ClerkSync"
import { Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

function Layout() {
  useApiInterceptor()
  return (
    <div>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
      </div>
      <hr />
      <ClerkSync />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  )
}

export default Layout
