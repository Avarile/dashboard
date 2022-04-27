import { createSlice } from "@reduxjs/toolkit"

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    selectedItems: [],
  },
  reducers: {
    setSelectedItems: (state, action) => {
      //get all or specified products/product

      return {
        ...state,
        selectedItems: action.payload,
      }
    },
  },
})

export const { setSelectedItems } = orderSlice.actions
export const selectOrder = (state: any) => state.order.selectedItems
export default orderSlice.reducer
