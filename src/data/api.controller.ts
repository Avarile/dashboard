// Universal Api controller
//

import axios from "axios"
import Storage from "@SRC/data/session.controller"
// about the @SRC
// first in webpack.config.js
// find resolve/alias add "@SRC": path.resolve("src"),

const { NODE_ENV } = process.env // retrive env values from process.env
//

class Request {
  axiosInstance: any

  constructor() {
    // initilize a singleton axios instance to perform all the api actions
    //
    this.axiosInstance = axios.create({
      timeout: 10000,
      baseURL: "",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "X-Requested-Width": "XMLHttpRequest",
      },
    })
    this.interceptRequest() // intercept all request and response
    this.interceptResponse()
  }

  private interceptRequest() {
    this.axiosInstance.interceptors.request.use((config: any) => {
      config.headers["token"] = Storage.getCachedDate("token") || "" // token is either the access token or just empty string
      if (config.url.includes("/upload")) {
        config.headers["Content-Type"] = "multipart/form-data"
      }
      return config
    })
  }

  private interceptResponse() {
    this.axiosInstance.interceptors.response.use((response: any) => {
      if (response?.data) {
        const { code = "200" } = response.data // NOTE: not all backend is restful
        if (code === "200" || response.statusText.toLocalLowerCase() === "ok") {
          return Promise.resolve(response)
        } else {
          return Promise.reject(response)
        }
      } else {
        // shall I return a error component here????
        return Promise.reject("no data")
      }
    }),
      (error: any) => {
        if (error.response) {
          const { status = "" } = error.response // set the dafault values of status to "", incase there is a error.response.status = undefined
          if (error.response.status === 401) {
            // window.history.push(LOGIN) // if token is not valid or avaliable or login failed, jump to login page
          }
          return Promise.reject(error)
        } else {
          // todo: shall I call a component to show the warning or message?
          return Promise.reject("request timeout, please refresh to try again")
        }
      }
  }

  /**
   * get data
   * @param url
   * @param params
   * @returns {Promise}
   */
  public get(url: string, params = {}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(url, {
          params: params,
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  /**
   * post data
   * @param url
   * @param params
   * @returns {Promise}
   */
  public post(url: string, params = {}, config: { [key: string]: any } = {}) {
    return new Promise((resolve, reject) => {
      if (typeof params === "object") {
        if (params.constructor.name === "FormData") {
          config["Content-Type"] = "multipart/form-data"
        }
      }
      this.axiosInstance
        .post(url, params, config)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  /**
   * patch
   * @param url
   * @param params
   * @returns {Promise}
   */
  public patch(url: string, params: {}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch(url, params)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  /**
   * put
   * @param url
   * @param params
   * @returns {Promise}
   */
  public put(url: string, params: {}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put(url, params)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }
}

export default new Request() // export the singleton
