import React, { useRef } from "react"
import "antd/dist/antd.css"
import { Form, Input, InputNumber, Button, FormInstance, Select } from "antd"
import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"
import qs from "query-string"
import { refineQueryString, debounce, deduplicateArray } from "@SRC/utils/utilFuncs"
import ProductList from "./ProductListModule"
import { details, subType } from "@SRC/utils/productTypes"
import { selectOrder, setOrderCustomer, setPrice } from "@DATA/dataSlices/order.slice"
import { useDispatch, useSelector } from "react-redux"
import SelectedListModule from "./SelectedItemsModule"

// layout Definition
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
}
// init env
const env = envSwitch("dev")

/* eslint-enable no-template-curly-in-string */

const CreateNewQuotation = () => {
  let selectedItems = useSelector(selectOrder).selectedItems
  let orderClient = useSelector(selectOrder).orderClient
  let orderPrices = useSelector(selectOrder).orderPrices

  const dispatch = useDispatch()

  const onFinish = () => {} // a hook for submit
  const formRef1 = useRef<FormInstance<any> | null>()
  const orderRef = useRef<any>({})
  //  order.current.client = client
  // order.current.items = [ {item1}, {item2} ...]
  // order.current.itemsLength = [
  // {}, {} ...
  //]

  // setStates init
  const [loadingStatus, setLoadingStatus] = React.useState(false)
  const [uiController, setUIController] = React.useState({
    userInfo: false,
    shippingInfo: false,
  })
  
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
        orderRef.current.client = response[0]
        const { name, id, email, mobile, vip } = response[0]
        formRef1.current?.setFieldsValue({
          client: {
            clientName: name,
            clientEmail: email,
            clientMobile: mobile,
            clientStatus: vip ? "returning Client" : "new Client",
          },
        }) //  fill the fomr
        dispatch(
          setOrderCustomer({
            name: name,
            email: email,
            mobile: mobile,
            vip: vip ? true : false,
          })
        ) // setup client in the redux
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

  const getProducts = async (queryParams: Object) => {
    console.log(queryParams)

    return await Request.get(`${env.dbUri}/products?${qs.stringify(refineQueryString(queryParams))}`)
  }

  const getProductTypes = async () => {
    return await Request.get(`${env.dbUri}/productTypes`)
  }
  React.useEffect(() => {
    orderRef.current.itemLength = []
    getProductTypes().then((response: any) => {
      setProductTypes(response)
    })
  }, [])

  const getProductListForSelect = () => {
    setLoadingStatus(true)
    let currentType = formRef1.current?.getFieldValue("products").productType
    let currentSubType = formRef1.current?.getFieldValue("products").productSubType
    let currentDetail = formRef1.current?.getFieldValue("products").productDetail
    let currentLength = formRef1.current?.getFieldValue("products").productLength

    let queryParams = {
      detail: currentDetail === "no detail" ? null : currentDetail,
      type: currentType,
      subtype: currentSubType === "no subtype" ? null : currentSubType,
      length: currentLength,
    }

    getProducts(queryParams)
      .then((response: any) => {
        // we got the temp array for operator to select, and will be reset after selected
        orderRef.current.tempSelection = response // and its obviously an array.
        //extract the length from products
        orderRef.current.itemLength = [] // before each call reset the itemLength list
        let currentFormValues = formRef1.current?.getFieldValue("products")
        formRef1.current?.setFieldsValue({
          ...currentFormValues,
          productLength: "default",
        })
        for (let item of orderRef.current.tempSelection) {
          // console.log(item.size.substring(0, item.size.indexOf(" ")), item.size.split(" ")[0])
          orderRef.current.itemLength.push(item.size.split("L")[0])
          orderRef.current.itemLength = deduplicateArray(orderRef.current.itemLength)
        }
      })
      .finally(() => {
        setLoadingStatus(false)
      })
  }
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
        }}
      >
        <Form.Item label="Search for the Client" style={{ display: "flex", flexDirection: "row" }}>
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
            <Input disabled={uiController.userInfo} placeholder="client name" />
          </Form.Item>
          <Form.Item name={["client", "clientEmail"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
            <Input disabled={uiController.userInfo} placeholder="client email" />
          </Form.Item>
          <Form.Item name={["client", "clientMobile"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
            <Input disabled={uiController.userInfo} placeholder="client mobile" />
          </Form.Item>
          <Form.Item name={["client", "clientStatus"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
            <Input disabled={uiController.userInfo} placeholder="client status" />
          </Form.Item>

          <Form.Item style={{ display: "inline-block" }}>
            <Button
              type="primary"
              block
              style={{}}
              onClick={() => {
                if (uiController.userInfo === false) {
                  const currentFormValues = formRef1.current?.getFieldValue("client")
                  const clientPayload = {
                    name: currentFormValues.clientName,
                    email: currentFormValues.clientEmail,
                    mobile: currentFormValues.clientMobile,
                    vip: currentFormValues.clientStatus === "returning Client" ? true : false,
                  }
                  createNewClient(clientPayload).then(() => {
                    setUIController({
                      ...uiController,
                      userInfo: true,
                    })
                  })
                }

                setUIController({
                  ...uiController,
                  userInfo: false,
                })
              }}>
              Create New User
            </Button>
          </Form.Item>
        </Form.Item>

        <Form.Item label="Shipping address" style={{ display: "flex", flexDirection: "row" }}>
          <Form.Item name={["shipping", "clientAddress"]} style={{ width: "50%", paddingRight: "5px", display: "inline-block" }}>
            <Input placeholder="Please provide a address if needed!" disabled={uiController.shippingInfo} />
          </Form.Item>

          <Form.Item name={["shipping", "clientShippingFee"]} style={{ width: "20%", paddingRight: "5px", display: "inline-block" }}>
            <Input placeholder="Please fill in the shipping fee" disabled={uiController.shippingInfo} />
          </Form.Item>
          <Form.Item style={{ display: "inline-block" }}>
            <Button
              type="primary"
              onClick={() => {
                setTimeout(() => {
                  dispatch(
                    setPrice({
                      ...orderPrices,
                      logisticCost: formRef1.current?.getFieldValue("shipping").clientShippingFee,
                      shippingAddress: formRef1.current?.getFieldValue("shipping").clientAddress,
                    })
                  )
                }, 2000)

                setUIController({
                  ...uiController,
                  shippingInfo: !uiController.shippingInfo,
                })
              }}>
              Comfirm Shipping Info
            </Button>
          </Form.Item>
        </Form.Item>

        <SelectedListModule />

        <Form.Item label="Item Selection" style={{ padding: "20px", display: "flex", flexDirection: "row" }}>
          <Form.Item name={["products", "productType"]} style={{ display: "inline-block", width: "calc(15%)", marginRight: "5px" }}>
            <Select
              placeholder="Determine the Type"
              defaultActiveFirstOption
              style={{}}
              onChange={() => {
                getProductListForSelect()
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
          <Form.Item name={["products", "productSubType"]} style={{ display: "inline-block", width: "calc(15%)", marginRight: "5px" }}>
            <Select
              placeholder="Determine the subType"
              defaultActiveFirstOption
              style={{}}
              onChange={() => {
                getProductListForSelect()
              }}>
              {subType.map((type: any) => {
                return (
                  <Select.Option key={type.id} value={type.name}>
                    {type.name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item name={["products", "productDetail"]} style={{ display: "inline-block", width: "calc(15%)", marginRight: "5px" }}>
            <Select
              placeholder="Determine the Detail"
              defaultActiveFirstOption
              style={{}}
              onChange={() => {
                getProductListForSelect()
              }}>
              {details.map((type: any) => {
                return (
                  <Select.Option key={type.id} value={type.name}>
                    {type.name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item name={["products", "productLength"]} style={{ display: "inline-block", width: "calc(15%)" }}>
            <Select
              placeholder="Determine the length"
              defaultActiveFirstOption
              style={{}}
              onChange={() => {
                getProductListForSelect()
              }}>
              {orderRef.current.itemLength?.map((length: any, index: number) => {
                return (
                  <Select.Option key={index} value={length}>
                    {length}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item style={{ display: "inline-block", width: "5rem" }}>
            <Button
              onClick={() => {
                orderRef.current.tempSelection = []
                formRef1.current?.resetFields()
                setLoadingStatus(false)
              }}>
              Reset Search
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>

      <ProductList values={orderRef.current.tempSelection} selected={orderRef.current.selectedItems} />
    </>
  )
}
export default CreateNewQuotation
