import { useAuth } from "@clerk/react"
import { useEffect, useRef } from "react"
import { api } from "../api/api"

export function ClerkSync() {
  console.log("API URL:", import.meta.env.VITE_API_URL)
  const { isSignedIn, getToken, isLoaded } = useAuth()
  const synced = useRef(false)

  useEffect(() => {
    if (!isSignedIn || synced.current) return

    const sync = async () => {
      try {
        const token = await getToken()
        console.log("token: ", token)

        await api.post(
          "/users/sync",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        )
        synced.current = true
      } catch (error) {
        console.error("Failed to sync user", error)
      }
    }

    sync()
  }, [isSignedIn, isLoaded])

  return null
}
