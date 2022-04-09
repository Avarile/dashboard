import { createSlice } from "@reduxjs/toolkit"
import Storage from "../session.controller"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      username: "",
      email: "",
      password: "",
      token: "",
    },
    error: "",
  },
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        user: action.payload,
      }
    },

    setToken: (state, action) => {
      Storage.setCacheData("TOKEN", action.payload.token)
      return {
        ...state,
        token: action.payload.token,
      }
    },

    // may not need it, for I am going to make error handling global
    setError: (state, action) => {
      return {
        ...state,
        error: action.payload,
      }
    },
  },
})

export const { setError, setUser, setToken } = authSlice.actions
export const selectAuth = (state: any) => state
export default authSlice.reducer
