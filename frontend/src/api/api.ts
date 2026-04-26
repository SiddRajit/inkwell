import axios from "axios"
import { useAuth } from "@clerk/react"
import { useEffect } from "react"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Hook to attach the interceptor — call this once at the top level
export function useApiInterceptor() {
  const { getToken } = useAuth()

  useEffect(() => {
    const interceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    return () => api.interceptors.request.eject(interceptor)
  }, [getToken])
}
