// redux store
//
import { configureStore } from "@reduxjs/toolkit"

// import all slices
import authReducer from "../dataSlices/auth.slice"
import productsReducer from "../dataSlices/products.slice"
import isloadingReducer from "../dataSlices/isloading.slice"

// end of slices

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    isloading: isloadingReducer,
  },
})
