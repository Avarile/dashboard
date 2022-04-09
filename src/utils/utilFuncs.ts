export type QueryStringType = {
  [Key: string]: any
}

export const refineQueryString = (queryString: QueryStringType) => {
  const response = { ...queryString } //spread and pass the values to response

  // equals to const result = Object.assign({}, object)
  Object.keys(response).forEach((key: any) => {
    const value: any = response[key] // ?????? todo need help
    // when value === null/undefined/false  but there is a problem that when value is 0, it will still return false,  so we need to deal with this, cuz 0 is still a valid value, and a valid value should not return false.
    if (isVoid(value)) {
      delete response[key] // if there is no value, delete the key
    }
  })
  return response
}

export const isVoid = (value: undefined | null | "") => {
  if (value === undefined || value === null || value === "") {
    return true
  } else return false
}
