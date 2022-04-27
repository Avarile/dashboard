import { createSlice } from "@reduxjs/toolkit"

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    selectedItems: [],
    orderPrices: {
      totalPCPrice: 0,
      totalInstallationPrice: 0,
      logisticCost: 0,
      totalItemPrices: 0,
      totalAmount: 0,
    },
  },
  reducers: {
    setSelectedItems: (state, action) => {
      //get all or specified products/product

      return {
        ...state,
        selectedItems: action.payload,
      }
    },
    setPrice: (state, action) => {
      return {
        ...state,
        orderPrices: action.payload,
      }
    },
  },
})

export const { setSelectedItems, setPrice } = orderSlice.actions
export const selectOrder = (state: any) => state.order
export default orderSlice.reducer
