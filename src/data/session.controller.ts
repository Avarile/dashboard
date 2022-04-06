// Cache controller
//
class Storage {
  // static store = process.env.NODE_ENV === "development" ? window.localStorage : window.sessionStorage // chose cache methods according to the env

  static cacheStore = window.sessionStorage

  // start of the tool functions
  /**
 n * check if the cachedData exist
   * @param key
   * @returns {boolean}
   */
  static existCachedData(key: string) {
    if (this.cacheStore.getItem(key) !== null) {
      return true
    } else {
      return false
    }
  }

  /**
   * determine if the value is valid according to the key
   * @param value
   * @returns boolean
   */
  static isVoid(value: any) {
    if (value === undefined || value === null || value === "") {
      return true
    } else {
      return false
    }
  }

  /**
   * serialization value
   * @param value
   * @returns {string}
   */
  static serialize(value: any) {
    if (typeof value === "string") {
      return value
    } else {
      return JSON.stringify(value)
    }
  }

  /**
   * deserialization cached value
   * @param cachedValue
   * @returns {*}
   */
  static deserialize(cachedValue: string | null) {
    if (typeof cachedValue !== "string") {
      return null
    } else {
      try {
        return JSON.parse(cachedValue)
      } catch (error) {
        throw new Error("Unexpected Error during deserialization from session cache")
      }
    }
  }
  // end of the tool functions

  /**
   * get the value according to the key
   * @param key: string
   * @returns {string | null}
   */
  static getCachedDate(key: string) {
    const value = this.cacheStore.getItem(key)
    return this.deserialize(value)
  }

  /**
   * Cache one item
   * @param key
   * @param value
   */
  static setCacheData(key: string, value: any) {
    if (this.isVoid(value)) {
      throw new Error("Cannot Cache Invalid Value")
    } else {
      this.cacheStore.setItem(key, this.serialize(value))
    }
  }

  /**
   * Cache multiple items
   * @param args
   */
  static setMultipleCacheData(...args: []) {
    try {
      args.map((item: { key: any; value: any }) => {
        this.setCacheData(item.key, item.value)
      })
    } catch (error) {
      throw new Error("Cannot Cache Invalid Value")
    }
  }

  /**
   * remove cachedData
   * @param key
   */
  static removeCachedData(key: string) {
    this.cacheStore.removeItem(key)
  }

  /**
   * remove multiple cacheData
   * @param keys
   */
  static removeMultipleCachedData(...keys: string[]) {
    keys.map((key) => {
      this.cacheStore.removeItem(key)
    })
  }

  /**
   * purge the currentSession
   */
  static purge() {
    this.cacheStore.clear()
  }

  /**
   * setCurrentValue according to the existence of the cached data
   * @param key
   * @param value
   * @returns {string}
   */
  static setValueDependingOnCacheStates(key: any, value: any) {
    const cachedValue = this.serialize(this.getCachedDate(key))
    return this.isVoid(cachedValue) ? value : cachedValue // if cachedValue is void then return the value passed in.
  }
}

export default Storage