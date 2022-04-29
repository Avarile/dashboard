import { createSlice } from "@reduxjs/toolkit"

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    selectedItems: [],
    orderPrices: {
      totalPCPrice: 0,
      totalInstallationPrice: 0,
      logisticCost: 0,
      shippingAddress: "",
      totalItemPrices: 0,
      totalAmount: 0,
    },
    orderClient: {},
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
    setOrderCustomer: (state, action) => {
      return {
        ...state,
        orderClient: action.payload,
      }
    },
  },
})



export const { setSelectedItems, setPrice, setOrderCustomer } = orderSlice.actions
export const selectOrder = (state: any) => state.order
export default orderSlice.reducer
