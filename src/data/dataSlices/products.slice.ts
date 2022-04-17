import { createSlice } from "@reduxjs/toolkit"

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    response: null,
  },
  reducers: {
    setProducts: (state, action) => {
      //get all or specified products/product
      console.log(action.payload)

      return {
        ...state,
        products: action.payload,
      }
    },

    setUpdateProduct: (state, action) => {
      // post or update
      return {
        ...state,
        product: action.payload,
      }
    },
    setMunipulateProductResponse: (state, action) => {
      return {
        ...state,
        response: action.payload,
      }
    },
  },
})

export const { setProducts, setUpdateProduct, setMunipulateProductResponse } = productsSlice.actions
export const selectProducts = (state: any) => state
export default productsSlice.reducer
