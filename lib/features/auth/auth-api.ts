import { refresh } from "next/cache"
import { apiSlice } from "../../api/api-slice"

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  email: string
  password: string
  name: string
}

interface AuthResponse {
  access_token: string
  refresh_token: string
  user: {
    id: string
    email: string
    name: string
  }
}

interface RefreshTokenDto {
  refresh_token: string
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    getMe: builder.query<AuthResponse["user"], void>({
      query: () => "/users/me",
      providesTags: ["User"],
    }),
    refreshToken: builder.mutation<AuthResponse, RefreshTokenDto>({
      query: (tokens) => ({
        url: "/auth/refresh",
        method: "POST",
        body: tokens,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useGetMeQuery } = authApi
