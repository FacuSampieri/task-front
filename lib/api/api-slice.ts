
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { RootState } from "../store"
import { logout, setCredentials } from "@/lib/features/auth/auth-slice"

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  prepareHeaders: (headers, { getState }) => {
    let token = (getState() as RootState).auth.token
    if (!token && typeof document !== "undefined") {
      const match = document.cookie.match(/(?:^|; )token=([^;]*)/)
      if (match) {
        token = decodeURIComponent(match[1])
      }
    }
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

// Custom baseQuery with automatic refresh
const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // Try to refresh token
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null
    if (refreshToken) {
      const refreshResult = await baseQuery({
        url: "/auth/refresh",
        method: "POST",
        body: { refresh_token: refreshToken },
      }, api, extraOptions)
      if (refreshResult.data) {
        // Save new tokens and retry original query
        const { access_token, refresh_token, user } = refreshResult.data as any
        api.dispatch(setCredentials({ token: access_token, refreshToken: refresh_token, user }))
        if (typeof window !== "undefined") {
          localStorage.setItem("token", access_token)
          localStorage.setItem("refresh_token", refresh_token)
        }
        // Retry original query with new token
        result = await baseQuery(args, api, extraOptions)
      } else {
        // Refresh failed, force logout
        api.dispatch(logout())
        if (typeof window !== "undefined") {
          localStorage.removeItem("token")
          localStorage.removeItem("refresh_token")
        }
      }
    } else {
      // No refresh token, force logout
      api.dispatch(logout())
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("refresh_token")
      }
    }
  }
  return result
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Task", "User", "File", "Group", "IntegrationStatus"],
  endpoints: () => ({}),
})
