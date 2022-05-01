import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"
import { refineQueryString, debounce, deduplicateArray } from "@SRC/utils/utilFuncs"
import qs from "query-string"

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
