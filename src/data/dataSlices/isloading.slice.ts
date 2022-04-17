import { createSlice, createStore } from "@reduxjs/toolkit"

export const isloadingSlice = createSlice({
  name: "isloading",
  initialState: {
    isloading: false,
    error: undefined,
  },
  reducers: {
    setIsloading: (state, action) => {
      return {
        ...state,
        isloading: action.payload,
      }
    },

    setError: (state, action) => {
      console.log(action.payload)

      return {
        ...state,
        error: action.payload,
      }
    },
  },
})

export const { setError, setIsloading } = isloadingSlice.actions
export const selectIsloading = (state: any) => state
export default isloadingSlice.reducer
export const isloadingStore = createStore(isloadingSlice.reducer)
