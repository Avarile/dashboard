import React, { useEffect, useRef, useState } from "react"
import "antd/dist/antd.css"
import { Form, Input, InputNumber, Button, FormInstance, Select } from "antd"
import Request from "@DATA/api.controller"
import axios from "axios"

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
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
}
/* eslint-enable no-template-curly-in-string */

const WarehousingDepositeForm = () => {
  // useRef example usage as  refering an instance of a component
  // 1st step: create a ref
  const ref = useRef<FormInstance<any> | null>()

  const onFinish = (values: any) => {
    console.log(values)
    console.log(ref.current?.getFieldValue("product"))
  }

  const [products, setProducts] = useState([])

  return (
    <Form
      initialValues={{}}
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      // validateMessages={validateMessages}
      style={{ flex: 1 }} // flex: 1 的作用
      //ref need to receive a instance of a component using a function to pass it into the current state of the ref.
      ref={(formInstance: FormInstance<any> | null) => {
        ref.current = formInstance
      }}>
      <Form.Item label="Product Name" style={{ marginBottom: 0 }}>
        <Form.Item name={["product", "productName"]} rules={[{ required: true }]} style={{ display: "inline-block", width: "calc(50% - 8px)", paddingRight: "5px" }}>
          <Input
            onChange={() => {
              console.log(ref.current?.getFieldValue("product")?.productName)
              Request.get(`http://localhost:3001/products?name=${ref.current?.getFieldValue("product")?.productName}`)
                .then((response: any) => {
                  setProducts(response)
                  console.log(response)
                })
                .catch((error: any) => {
                  throw new Error(error)
                })
            }}
          />
        </Form.Item>
        <Form.Item name={["product", "productName"]} style={{ display: "inline-block", width: "calc(50% - 8px)" }}>
          <Select placeholder="Select Product">
            {products.map((product: any) => {
              return (
                <Select.Option value={product} key={product}>
                  {product}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form.Item>
      <Form.Item
        name={["product", "productSKU"]}
        label="SKU"
        rules={[
          {
            required: true,
            message: "must provide products SKU",
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={["product", "productQuantity"]}
        label="Quantity"
        rules={[
          {
            type: "number",
            message: "Quantity has to be number",
          },
        ]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["product", "productQuantityInstock"]}
        label="Quantity inStock"
        rules={[
          {
            type: "number",
            min: 0,
            max: 99999,
          },
        ]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={["product", "productDescription"]} label="Description">
        <Input.TextArea style={{ minHeight: "20rem", maxHeight: "25rem" }} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" block style={{ marginBottom: "1rem" }}>
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
  )
}
export default WarehousingDepositeForm
