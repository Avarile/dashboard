import React, { useRef, useState } from "react"
import "antd/dist/antd.css"
import { Form, Input, Button, Space, FormInstance } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { getClientsByParams, manipulateUserInfo } from "@DATA/api.service"
import { setSelectedItems, setPrice, setOrderCustomer, setOrderShippingInfo, selectOrder } from "@DATA/dataSlices/order.slice"

const { Search } = Input

const CreateNewQuotation = () => {
  const [loadingStatus, setLoadingStatus] = React.useState({
    userInfo: false,
  })
  const [uiController, setUIController] = React.useState({
    userInfo: false,
    userCreateOrEditSwitch: false,
    shippingInfo: false,
  })
  const onFinish = (values: any) => {
    console.log("Received values of form:", values)
  }

  const generateClientQueryString = () => {
    let queryParam
    let currentFormValue = formInstance?.getFieldValue("client")
    if (!isNaN(currentFormValue.clientSearch)) {
      // if the string can be transform to number and bigger than 0, it must be a number.
      queryParam = { mobile: Number(currentFormValue.clientSearch) }
    } else {
      queryParam = { email: currentFormValue.clientSearch }
    }
    return queryParam
  }

  const [formInstance] = Form.useForm()

  return (
    <Form name="orderCreationForm" onFinish={onFinish} autoComplete="off" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} form={formInstance}>
      <Form.Item label="User Selection">
        <Form.Item
          name={["client", "clientSearch"]}
          rules={[{ required: false }]}
          style={{
            display: "inline-block",
            width: "calc(20%)",
            paddingRight: "5px",
          }}>
          <Search
            allowClear
            loading={loadingStatus.userInfo}
            placeholder="Please Input the client Email or Mobile Number"
            onChange={() => {
              getClientsByParams(generateClientQueryString(), loadingStatus, setLoadingStatus, formInstance, setUIController, uiController)
            }}
          />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "id"]} style={{ display: "inline-block", width: "calc(5%)", paddingRight: "5px" }}>
          <Input disabled placeholder="ID" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "name"]} style={{ display: "inline-block", width: "calc(25%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="client name" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "email"]} style={{ display: "inline-block", width: "calc(35%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="client email" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "mobile"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="client mobile" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "vip"]} style={{ display: "inline-block", width: "calc(10%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="client status" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name={["client", "address"]} style={{ display: "inline-block", width: "calc(35%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="Address" />
        </Form.Item>
        <Form.Item name={["client", "postcode"]} style={{ display: "inline-block", width: "calc(35%)", paddingRight: "5px" }} rules={[{ required: true }]}>
          <Input disabled={uiController.userInfo} placeholder="Postcode" />
        </Form.Item>

        <Form.Item style={{ display: "inline-block", marginRight: "5px" }}>
          <Button
            type="primary"
            block
            style={{}}
            onClick={() => {
              const { id, name, email, mobile, vip, address, postcode } = formInstance.getFieldValue("client")
              const payload = {
                id: id,
                name: name,
                email: email,
                mobile: mobile,
                vip: vip,
                address: address,
                postcode: postcode,
              }
              manipulateUserInfo(payload, "update")
            }}>
            Update User
          </Button>
        </Form.Item>
        <Form.Item style={{ display: "inline-block" }}>
          <Button
            type="primary"
            block
            style={{}}
            onClick={() => {
              const { id, name, email, mobile, vip, address, postcode } = formInstance.getFieldValue("client")
              manipulateUserInfo(
                {
                  id: id,
                  name: name,
                  email: email,
                  mobile: mobile,
                  vip: vip,
                  address: address,
                  postcode: postcode,
                },
                "create"
              )
            }}>
            Create User
          </Button>
        </Form.Item>
      </Form.Item>

      <Form.Item label="Shipping Info">
        <Form.Item
          name={["shipping", "Address"]}
          rules={[{ required: true }]}
          style={{
            display: "inline-block",
            width: "calc(55%)",
            paddingRight: "5px",
          }}>
          <Input placeholder="Shipping Address" onChange={() => {}} />
        </Form.Item>
        <Form.Item name={["shipping", "postcode"]} style={{ display: "inline-block", width: "calc(10%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="postcode" />
        </Form.Item>
        <Form.Item name={["shipping", "shippingFee"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="shippingFee" />
        </Form.Item>

        <Form.Item style={{ display: "inline-block" }}>
          <Button
            type="primary"
            block
            style={{}}
            onClick={() => {
              dis
            }}>
            Comfirm Shipping Info
          </Button>
        </Form.Item>
      </Form.Item>

      <Form.Item label="Item List">
        <Form.List name="products">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex" }} align="start" size={1}>
                  <Form.Item {...restField} name={[name, "sku"]} rules={[{ required: true, message: "required" }]} style={{ width: "5rem" }}>
                    <Input
                      placeholder="SKU"
                      onChange={() => {
                        console.log(formInstance?.getFieldValue("users"))
                      }}
                    />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "name"]} rules={[{ required: true, message: "required" }]} style={{ width: "15rem" }}>
                    <Input placeholder="Product Name" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "size"]} rules={[{ required: true, message: "required" }]}>
                    <Input placeholder="Size" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "price"]} rules={[{ required: true, message: "required" }]} style={{ width: "7rem" }}>
                    <Input placeholder="Item Price" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "pcPrice"]} rules={[{ required: true, message: "required" }]} style={{ width: "9rem" }}>
                    <Input placeholder="Powder Coating" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "installPrice"]} rules={[{ required: true, message: "required" }]} style={{ width: "7rem" }}>
                    <Input placeholder="Install Fee" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "desc"]}>
                    <Input placeholder="Description" style={{ width: "31rem" }} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button style={{ width: "86rem" }} type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateNewQuotation
