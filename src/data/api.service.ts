import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"
import { refineQueryString, debounce, deduplicateArray } from "@SRC/utils/utilFuncs"
import qs from "query-string"
import { store } from "./dataStore/store.redux"
import { setSelectedItems, setPrice, setOrderCustomer, setOrderShippingInfo } from "@DATA/dataSlices/order.slice"
import { SocketAddress } from "net"

const dispatch = store.dispatch

const env = envSwitch("dev")

export const generateOrder = async (payload: object) => {
  return await Request.post(`${env.dbUri}/orders`, payload, {}, "order")
}

export const getOrders = async () => {
  return await Request.get(`${env.dbUri}/orders`)
}

export const getProductBySku = async (searchParams: { sku: string }) => {
  return await Request.get(`${env.dbUri}/products?${qs.stringify(refineQueryString(searchParams))}`).then((response: any) => {
    console.log(response)
  })
}

export const CreateClient = (payload: Object) => {}

export const getClientsByParams = (
  params: { email: string } | { mobile: number },
  setLoadingStatus: any,
  formInstance: any,
  setUiController: any,
  uiController: { userInfo: any; userInfoSwitch: any; shippingInfo: any }
) => {
  setLoadingStatus(true)

  const tempFunc = async () => {
    await Request.get(`${env.dbUri}/clients?${qs.stringify(refineQueryString(params))}`)
      .then((response: any) => {
        if (response.length > 0) {
          setUiController({
            ...uiController,
            userInfoSwitch: true,
          })

          const { name, id, email, mobile, vip, address, shippingAddress } = response[0]
          formInstance.setFieldsValue({
            client: {
              name: name,
              email: email,
              mobile: mobile,
              vip: vip,
              address: address,
              shippingAdress: shippingAddress,
              id: id,
            },
          })
        } else {
          formInstance.setFieldsValue({
            client: {
              name: null,
              email: null,
              mobile: null,
              vip: null,
              address: null,
              shippingAdress: null,
              id: null,
            },
          })
        }
      })
      .finally(() => {
        setLoadingStatus(false)
      })
  }

  tempFunc()
}

// export
