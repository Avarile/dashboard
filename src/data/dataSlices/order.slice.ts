import { createSlice } from "@reduxjs/toolkit"
import { Action } from "history"

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    selectedItems: [],
    orderPrices: {
      totalPCPrice: 0,
      totalInstallationPrice: 0,
      totalItemPrices: 0,
      totalAmount: 0,
    },
    orderShippingInfo: {
      shippingAddress: "",
      postcode: "",
      fee: 0,
    },
    orderClient: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      shippingAddress: "",
      vip: false,
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
    setOrderCustomer: (state, action) => {
      return {
        ...state,
        orderClient: action.payload,
      }
    },
    setOrderShippingInfo: (state, action) => {
      return {
        ...state,
        orderShippingInfo: action.payload,
      }
    },
  },
})

export const { setSelectedItems, setPrice, setOrderCustomer, setOrderShippingInfo } = orderSlice.actions
export const selectOrder = (state: any) => state.order
export default orderSlice.reducer
