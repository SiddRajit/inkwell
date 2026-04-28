import { useApiInterceptor } from "@/api/api"
import { ClerkSync } from "@/components/ClerkSync"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

function Layout() {
  useApiInterceptor()
  return (
    <div className="flex min-h-screen flex-col">
      <div>
        <Navbar />
      </div>
      <hr />
      <ClerkSync />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />

      <TanStackRouterDevtools />
    </div>
  )
}

export default Layout
