import React, { useRef } from "react"
import "antd/dist/antd.css"
import { Form, Input, InputNumber, Button, FormInstance, Select } from "antd"
import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"
import qs from "query-string"
import { refineQueryString, debounce } from "@SRC/utils/utilFuncs"

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "Please specify a ${label}!",
  types: {
    number: "${label} is not a valid number!",
    email: "${label} is not a valid Email address!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
}
/* eslint-enable no-template-curly-in-string */

const CreateNewQuotation = () => {
  // env config loading
  const env = envSwitch("dev")
  //

  // useRef example usage as  refering an instance of a component
  // 1st step: create a ref
  const ref = useRef<FormInstance<any> | null>()
  const currentOrderRef = useRef({
    client: {},
    products: {
      temp: [],
      product1: {},
    },
    powderCoating: [],
    workShop: [],
    price: {},
  }) // for the CurrentOrder we are working on
  const [loadingStatus, setLoadingStatus] = React.useState(false)
  const [productTypes, setProductTypes] = React.useState<any>([])

  const onFinish = (values: any) => {}

  // Data managments
  const getClients = async (queryParams: { name?: string; email?: string; mobile?: number }) => {
    return await Request.get(`${env.dbUri}/clients?${qs.stringify(refineQueryString(queryParams))}`)
  }

  const getProducts = async (queryParams: { type: string }) => {
    return await Request.get(`${env.dbUri}/products?${qs.stringify(refineQueryString(queryParams))}`)
  }

  const getProductTypes = async () => {
    return await Request.get(`${env.dbUri}/productTypes`)
  }
  React.useEffect(() => {
    getProductTypes().then((response: any) => {
      setProductTypes(response)
    })
  }, [])

  const createNewProduct = (payload: object) => {
    return Request.post(`${env.dbUri}/products`, payload, {}, "Product")
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <h3>Quotation</h3>
      </div>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        // validateMessages={validateMessages}
        style={{ flex: 1, paddingRight: "40px", marginLeft: "-5rem" }}
        //ref need to receive a instance of a component using a function to pass it into the current state of the ref.
        ref={(formInstance: FormInstance<any> | null) => {
          ref.current = formInstance
        }}>
        <Form.Item label="Client" style={{ marginBottom: 0, display: "flex", flexDirection: "row" }}>
          <Form.Item
            name={["order", "client", "clientName"]}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(20%)",
              paddingRight: "5px",
            }}>
            <Input
              placeholder="Search by name"
              onChange={() => {
                let currentFormValue = ref.current?.getFieldValue("order")

                let queryParams = {
                  name: currentFormValue?.client.clientName,
                }
                // make apiCall according to the params and then debounce it.
                const debouncedApiCall = debounce(() => {
                  getClients(queryParams).then((response: any) => {
                    currentOrderRef.current.client = response?.[0] // store the client from response
                    const { email, mobile } = response?.[0]
                    // set the FormFields
                    ref.current?.setFieldsValue({
                      order: {
                        client: {
                          clientEmail: email,
                          clientMobile: mobile,
                        },
                      },
                    })
                  })
                })
                // make the debounced call
                debouncedApiCall(3000)
              }}
            />
          </Form.Item>
          <Form.Item
            name={["order", "client", "clientEmail"]}
            rules={[{ required: true, type: "email" }]}
            style={{
              display: "inline-block",
              width: "calc(40%)",
              paddingRight: "5px",
            }}>
            <Input
              placeholder="Search by Email"
              onChange={() => {
                let currentFormValue = ref.current?.getFieldValue("order")

                let queryParams = {
                  email: currentFormValue?.client.clientEmail,
                }
                // make apiCall according to the params and then debounce it.
                const debouncedApiCall = debounce(() => {
                  getClients(queryParams).then((response: any) => {
                    currentOrderRef.current.client = response?.[0] // store the client from response
                    const { name, mobile } = response?.[0]
                    // set the FormFields
                    ref.current?.setFieldsValue({
                      order: {
                        client: {
                          clientName: name,
                          clientMobile: mobile,
                        },
                      },
                    })
                  })
                })
                // make the debounced call
                debouncedApiCall(3000)
              }}
            />
          </Form.Item>
          <Form.Item
            name={["order", "client", "clientMobile"]}
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(40%)",
            }}>
            <Input
              placeholder="Search by Mobile Number"
              onChange={() => {
                let currentFormValue = ref.current?.getFieldValue("order")

                let queryParams = {
                  mobile: currentFormValue?.client.clientMobile,
                }
                // make apiCall according to the params and then debounce it.
                const debouncedApiCall = debounce(() => {
                  getClients(queryParams).then((response: any) => {
                    currentOrderRef.current.client = response?.[0] // store the client from response
                    const { name, email } = response?.[0]
                    // set the FormFields
                    ref.current?.setFieldsValue({
                      order: {
                        client: {
                          clientName: name,
                          clientEmail: email,
                        },
                      },
                    })
                  })
                })
                // make the debounced call
                debouncedApiCall(3000)
              }}
            />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Item" style={{ marginBottom: 0, display: "flex", flexDirection: "row" }}>
          <Form.Item
            name={["order", "item", "itemType"]}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(20%)",
              paddingRight: "5px",
            }}>
            <Select
              placeholder="Select ProductType"
              onChange={() => {
                setLoadingStatus(true)
                let currentFormValue = ref.current?.getFieldValue("order")

                let queryParams = {
                  type: currentFormValue?.item.itemType,
                }
                // make apiCall according to the params and then debounce it.
                const debouncedApiCall = debounce(() => {
                  getProducts(queryParams).then((response: any) => {
                    currentOrderRef.current.products.temp = response
                  })
                  setLoadingStatus(false)
                })
                // make the debounced call
                debouncedApiCall(3000)
              }}>
              {productTypes.map((type: { id: number; name: string }) => {
                return (
                  <Select.Option key={type.id} value={type.name}>
                    {type.name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={["order", "item", "product1"]}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(40%)",
              paddingRight: "5px",
            }}>
            <Select placeholder="Select Product" onChange={() => {}}>
              {currentOrderRef.current.products.temp.map((product: any) => {
                return (
                  <Select.Option key={product.sku} value={product.name}>
                    {product.name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name={["order", "client", "clientMobile"]}
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(40%)",
            }}>
            <Input
              placeholder="Search by Mobile Number"
              onChange={() => {
                let currentFormValue = ref.current?.getFieldValue("order")

                let queryParams = {
                  mobile: currentFormValue?.client.clientMobile,
                }
                // make apiCall according to the params and then debounce it.
                const debouncedApiCall = debounce(() => {
                  getClients(queryParams).then((response: any) => {
                    currentOrderRef.current.client = response?.[0] // store the client from response
                    const { name, email } = response?.[0]
                    // set the FormFields
                    ref.current?.setFieldsValue({
                      order: {
                        client: {
                          clientName: name,
                          clientEmail: email,
                        },
                      },
                    })
                  })
                })
                // make the debounced call
                debouncedApiCall(3000)
              }}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item name={["product", "productDescription"]} label="Description">
          <Input.TextArea style={{ minHeight: "10rem", maxHeight: "25rem" }} />
        </Form.Item>
        <Form.Item name={["product", "productSpecification"]} label="Specification">
          <Input.TextArea style={{ minHeight: "10rem", maxHeight: "25rem" }} />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button
            type="primary"
            // htmlType="submit"
            block
            style={{ marginBottom: "1rem" }}
            loading={loadingStatus}
            onClick={() => {
              setLoadingStatus(true)
              setTimeout(() => {
                const currentFormValues = ref.current?.getFieldValue("product")
                const productPayload = {
                  type: currentFormValues.productType,
                  name: currentFormValues.productName,
                  sku: currentFormValues.productSku,
                  size: currentFormValues.productSize,
                  price: currentFormValues.productPrice,
                  powdercoatingprice: currentFormValues.productPowderCoatingPrice,
                  installationprice: currentFormValues.productPowderInstallationPrice,
                  desc: currentFormValues.productDescription,
                  spec: currentFormValues.productSpecification,
                  currentInStock: 0,
                  updateLog: "",
                }
                createNewProduct(productPayload)
                setLoadingStatus(false)
                ref.current?.resetFields()
              }, 2000)
            }}>
            Submit
          </Button>
          <Button
            onClick={() => {
              ref.current?.resetFields()
            }}
            block>
            Reset Form
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
export default CreateNewQuotation
