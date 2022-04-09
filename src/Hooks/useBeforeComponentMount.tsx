import React from "react"

export const useComponentWillMount = (callback: () => {}): boolean | undefined | null => {
  const willMount = React.useRef(true)
  if (willMount.current) {
    callback()
    willMount.current = false
  } else return null
}
