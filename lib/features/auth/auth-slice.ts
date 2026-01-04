import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  token: string | null
  refreshToken: string | null
  user: {
    id: string
    email: string
    name: string
  } | null
}

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  refreshToken: typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null,
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; refreshToken?: string; user: any }>) => {
      state.token = action.payload.token
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken
      }
      state.user = action.payload.user
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token)
        if (action.payload.refreshToken) {
          localStorage.setItem("refresh_token", action.payload.refreshToken)
        }
      }
    },
    logout: (state) => {
      state.token = null
      state.refreshToken = null
      state.user = null
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("refresh_token")
      }
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
