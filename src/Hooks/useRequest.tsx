import React from "react"

const useRequestHandler = (promise: any, options: {}, interval: number = 200, retry: number = 3) => {
  // I know it's anyScript
  const [state, setState] = React.useState({
    status: "pending",
    error: null,
    data: null,
  })

  const request = async (options: {}) => {
    setState({ status: "loading", error: null, data: null })
    promise(options)
      .then((response: any) => {
        setState({
          ...state,
          data: response.data,
        })
      })
      .catch((error: any) => {
        throw new Error("Error happens", error)
      })
  }

  React.useEffect(() => {
    for (let i = 0; i < retry; i++) {
      setInterval(() => {
        request(options)
      }, interval)
    }
    // set a retry time
  }, [interval])

  return state
}

export default useRequestHandler
