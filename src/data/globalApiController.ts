import Request from "./api.controller"
import { registries } from "@DATA/apiConstants"

// design:
// 收到api名之后， 去仓库查找 如果有值 直接返回该值 如果没有就make a call 再返回
interface IGlobalController {
  apiName: string
  apiUrl: string
}
/**
 * GlobalApiController
 * @param apiName
 * @returns {Promise}
 */
const globalApiController = (apiName: string, query: object | undefined) => {
  const store: [object] | [] = [] //init store

  // 2 conditions, 1st the call is not a query, normally it's a init call

  let registry = registries[apiName as keyof typeof registries]  // 
  Request.get(registry.apiUrl, query).then((response: any) => { 
    
  })
}
