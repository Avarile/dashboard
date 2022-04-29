import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"

const env = envSwitch("dev")

export const generateOrder = async (payload: object) => {
  return await Request.post(`${env.dbUri}/orders`, payload, {}, "order")
}

export const getOrders = async () => {
  return await Request.get(`${env.dbUri}/orders`)
}
