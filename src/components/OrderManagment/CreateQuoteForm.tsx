import React, { useRef } from "react"
import "antd/dist/antd.css"
import { Form, Input, InputNumber, Button, FormInstance, Select } from "antd"
import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"
import qs from "query-string"
import { refineQueryString, debounce } from "@SRC/utils/utilFuncs"
import { types } from "@babel/core"

// layout Definition
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
// init env
const env = envSwitch("dev")

/* eslint-enable no-template-curly-in-string */

const CreateNewQuotation = () => {
  const onFinish = () => {} // a hook for submit
  const formRef1 = useRef<FormInstance<any> | null>()
  const refClient = useRef<any>({})
  refClient.current.clients = []

  // setStates init
  const [loadingStatus, setLoadingStatus] = React.useState(false)
  const [uiController, setUIController] = React.useState(true)
  // const [clients, setClients] = React.useState<any>([])

  // start of customer state
  /**
   * search for customer
   * @param param
   * @returns customer | null
   */
  const getClientsByParam = (param: { email: string } | { mobile: number }) => {
    setLoadingStatus(true)
    const tempFunc = async () => {
      await Request.get(`${env.dbUri}/clients?${qs.stringify(refineQueryString(param))}`).then((response: any) => {
        refClient.current.clients = response
        const { name, id, email, mobile, vip } = response[0]
        formRef1.current?.setFieldsValue({
          client: {
            clientName: name,
            clientEmail: email,
            clientMobile: mobile,
            clientStatus: vip ? "returning Client" : "new Client",
          },
        })
        setLoadingStatus(false)
      })
    }
    tempFunc()
  }

  /**
   * create New Client
   *
   */
  const createNewClient = async (payload: Object) => {
    return await Request.post(`${env.dbUri}/clients`, payload, {}, "Client")
  }
  // end of customer state

  // start of product Selection
  const [productTypes, setProductTypes] = React.useState<any>([])

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
  // end of product Selection

  return (
    <>
      <Form
        // {...layout}
        initialValues={{}}
        name="clientSelection"
        onFinish={onFinish}
        // validateMessages={validateMessages}
        style={{ flex: 1, height: "100%vh" }} // flex: 1 的作用
        //ref need to receive a instance of a component using a function to pass it into the current state of the ref.
        ref={(formInstance: FormInstance<any> | null) => {
          formRef1.current = formInstance
        }}>
        <Form.Item label="Search for the Client" style={{ marginBottom: "20px", display: "flex", flexDirection: "row" }}>
          <Form.Item
            name={["client", "clientSearch"]}
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(20%)",
              paddingRight: "5px",
            }}>
            <Input
              placeholder="Please Input the client Email or Mobile Number"
              onChange={() => {
                let queryParam
                let currentFormValue = formRef1.current?.getFieldValue("client")
                if (!isNaN(currentFormValue.clientSearch)) {
                  // if the string can be transform to number and bigger than 0, it must be a number.
                  queryParam = { mobile: Number(currentFormValue.clientSearch) }
                } else {
                  queryParam = { email: currentFormValue.clientSearch }
                }
                getClientsByParam(queryParam)
              }}
            />
          </Form.Item>
          <Form.Item name={["client", "clientName"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
            <Input disabled={uiController} placeholder="client name" />
          </Form.Item>
          <Form.Item name={["client", "clientEmail"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
            <Input disabled={uiController} placeholder="client email" />
          </Form.Item>
          <Form.Item name={["client", "clientMobile"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
            <Input disabled={uiController} placeholder="client mobile" />
          </Form.Item>
          <Form.Item name={["client", "clientStatus"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
            <Input disabled={uiController} placeholder="client status" />
          </Form.Item>

          <Form.Item style={{ display: "inline-block" }}>
            <Button
              type="primary"
              block
              style={{}}
              onClick={() => {
                if (uiController === false) {
                  const currentFormValues = formRef1.current?.getFieldValue("client")
                  const clientPayload = {
                    name: currentFormValues.clientName,
                    email: currentFormValues.clientEmail,
                    mobile: currentFormValues.clientMobile,
                    vip: currentFormValues.clientStatus === "returning Client" ? true : false,
                  }
                  createNewClient(clientPayload).then(() => {
                    setUIController(true)
                  })
                }
                setUIController(false)
              }}>
              Create New User
            </Button>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Item Selection" style={{ padding: "20px", display: "flex", flexDirection: "row" }}>
          <Form.Item name={["products", "productType"]}>
            <Select
              placeholder="Determine the Type first"
              defaultActiveFirstOption
              style={{ minWidth: "15rem" }}
              onChange={() => {
                setLoadingStatus(true)
                debugger
                let currentType = formRef1.current?.getFieldValue("products")
                console.log(currentType)

                getProducts({ type: currentType.productType }).then((response: any) => {
                  formRef1.current?.setFieldsValue({
                    products: {},
                  })
                })
              }}>
              {productTypes.map((type: any) => {
                return (
                  <Select.Option key={type.id} value={type.name}>
                    {type.name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
        </Form.Item>
      </Form>
    </>
  )
}
export default CreateNewQuotation
