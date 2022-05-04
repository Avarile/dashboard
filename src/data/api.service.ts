import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"
import { refineQueryString, debounce, deduplicateArray } from "@SRC/utils/utilFuncs"
import qs from "query-string"
import { store } from "./dataStore/store.redux"
import { setSelectedItems, setPrice, setOrderCustomer, setOrderShippingInfo } from "@DATA/dataSlices/order.slice"
import { IUser, IProduct } from "src/utils/interfaces"
import Notification from "@SRC/components/Notification"

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
  loadingStatus: any,
  setLoadingStatus: any,
  formInstance: any,
  setUiController: any,
  uiController: { userInfo: any; userCreateOrEditSwitch: any; shippingInfo: any }
) => {
  setLoadingStatus({
    ...loadingStatus,
    userInfo: true,
  })
  const tempFunc = async () => {
    await Request.get(`${env.dbUri}/clients?${qs.stringify(refineQueryString(params))}`)
      .then((response: any) => {
        if (response.length > 0) {
          setUiController({
            ...uiController,
            userCreateOrEditSwitch: true,
          })

          const { name, id, email, mobile, vip, address, postcode } = response[0]
          formInstance.setFieldsValue({
            client: {
              name: name,
              email: email,
              mobile: mobile,
              vip: vip,
              address: address,
              postcode: postcode,
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
              postcode: null,
              id: null,
            },
          })
        }
      })
      .finally(() => {
        // setUiController({
        //   ...uiController,
        //   userCreateOrEditSwitch: false,
        // })
        setLoadingStatus({
          ...loadingStatus,
          userInfo: false,
        })
      })
  }

  const debouncedTempFunc = debounce(tempFunc, 3000)
  debouncedTempFunc()
}

/**
 * Update exiting user Info or Create new user
 *
 */
export const manipulateUserInfo = async (payload: IUser, funcSwitch: "create" | "update") => {
  if (funcSwitch === "update") {
    await Request.put(`${env.dbUri}/clients/${payload.id}}`, payload, `User Info${payload.name}`)
  }
  if (funcSwitch === "create") {
    await Request.post(`${env.dbUri}/clients`, payload, {}, `user: ${payload.name}`)
  } else return Notification({ type: "error", message: "User Component Error" })
}
