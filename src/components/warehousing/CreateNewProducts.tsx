import React, { useRef } from "react"
import "antd/dist/antd.css"
import { Form, Input, InputNumber, Button, FormInstance, Select, notification } from "antd"
import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"
import { details, subType, productTypes } from "@SRC/utils/productTypes"
import dayjs from "dayjs"

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
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
}
/* eslint-enable no-template-curly-in-string */

const CreateNewItem = () => {
  // env config loading
  const env = envSwitch("dev")
  //

  // useRef example usage as  refering an instance of a component
  // 1st step: create a ref
  const ref = useRef<FormInstance<any> | null>()
  const [loadingStatus, setLoadingStatus] = React.useState(false)

  const onFinish = (values: any) => {}

  const createNewProduct = (payload: object) => {
    return Request.post(`${env.dbUri}/products`, payload, {}, "Product")
  }

  return (
    <Form
      {...layout}
      name="product creation"
      onFinish={onFinish}
      // validateMessages={validateMessages}
      style={{ flex: 1 }}
      //ref need to receive a instance of a component using a function to pass it into the current state of the ref.
      ref={(formInstance: FormInstance<any> | null) => {
        ref.current = formInstance
      }}>
      <Form.Item
        name={["product", "productType"]}
        label="Product Type"
        rules={[
          {
            required: true,
          },
        ]}>
        <Select
          placeholder="Please select a Type"
          onChange={() => {
            // console.log(ref.current?.getFieldValue("product").productType)
            setLoadingStatus(false)
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
        name={["product", "productSubType"]}
        label="SubType"
        rules={[
          {
            required: true,
          },
        ]}>
        <Select placeholder="Please select SubType of the product">
          {subType.map((sub: any) => {
            return (
              <Select.Option key={sub.id} value={sub.name}>
                {sub.name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={["product", "productDetail"]}
        label="Detail"
        rules={[
          {
            required: true,
          },
        ]}>
        <Select placeholder="Please select the detail definition">
          {details.map((detail) => {
            return (
              <Select.Option key={detail.id} value={detail.name}>
                {detail.name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={["product", "productName"]}
        label="Product Name"
        rules={[
          {
            required: true,
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={["product", "productSku"]}
        label="SKU"
        rules={[
          {
            required: true,
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={["product", "productSize"]}
        label="Size"
        rules={[
          {
            required: true,
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        name={["product", "productLength"]}
        label="Length"
        rules={[
          {
            required: true,
          },
        ]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["product", "productPrice"]}
        label="Price"
        rules={[
          {
            type: "number",
            min: 0,
          },
        ]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["product", "productPowderCoatingPrice"]}
        label="PowderCoatingPrice"
        rules={[
          {
            type: "number",
            min: 0,
          },
        ]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["product", "productPowderInstallationPrice"]}
        label="InstallationPrice"
        rules={[
          {
            type: "number",
            min: 0,
          },
        ]}>
        <InputNumber />
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
                subtype: currentFormValues.productSubType,
                detail: currentFormValues.productDetail,
                length: currentFormValues.productLength,
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
                lastUpdate: dayjs().format("DD/MM/YYYY"),
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
  )
}
export default CreateNewItem
