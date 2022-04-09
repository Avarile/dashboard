# Problems and Solution

#### 9/Apr 2022

1. How to query the apiCall so if there is no query at all return the entire content and split pages(if nessesary).

- Problem description: before first screen render happens, we need certain amount of data is loaded. As our apiRequest looks like this:

```
// this is how our apiCall looks like now, and there is a problem --- actually lots of problem.
// first even when there is now productName or productSku is provided, the query structure remains, and what we got will be nothing.

the query - "http://localhost:3001/products?name=&sku=" - is not gonna give us anything, and before the first render we gonna need ""http://localhost:3001/products"


 <Form.Item label="Product Name" style={{ marginBottom: 0 }}>
        <Form.Item name={["product", "productName"]} rules={[{ required: true }]} style={{ display: "inline-block", width: "calc(50% - 8px)", paddingRight: "5px" }}>
          <Input
          //  onChange={() => {
          //     console.log(ref.current?.getFieldValue("product")?.productName)
          //     Request.get(`http://localhost:3001/products?name=${ref.current?.getFieldValue("product")?.productName}`)
          //       .then((response: any) => {
          //         setProducts(response)
          //         console.log(ref.current?.getFieldValue("product")?.productName)
          //       })

          //       .catch((error: any) => {
          //         throw new Error(error)
          //       })
          //   }}
          />
        </Form.Item>

```

```
// when debug, we can found because the setState is async, so when setProduct, it's not gonna happen instantly, but at next render.
useEffect(() => {
    Request.get(`http://localhost:3001/products`)
      .then((response: any) => {
        setProducts(response)
        debugger
        console.log(products) // => products now still === []
      })

      .catch((error: any) => {
        throw new Error(error)
      })
  }, [])

```

- solution to the first problem:query-string
```



```

- Solution to the second : as the setState is working asynchronously, I think I need to load the first render required data before the component is mounted --- I think there was a hook called beforeComponentMount in the class components, and lets implement one in funcational way.

```
// I did my best, I cannot say it's correct... but it works
import React from "react"

export const useComponentWillMount = (callback: () => {}): boolean | undefined | null => {
  const willMount = React.useRef(true)
  if (willMount.current) {
    callback()
    willMount.current = false
  } else return null
}


```
