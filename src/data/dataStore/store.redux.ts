// redux store
//
import { configureStore } from "@reduxjs/toolkit"

// import all slices
import authRuducer from "../dataSlices/auth.slice"
import productsRuducer from "../dataSlices/products.slice"

// end of slices

export const store = configureStore({
  reducer: {
    auth: authRuducer,
    products: productsRuducer,
  },
})
