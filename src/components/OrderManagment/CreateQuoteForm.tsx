import React, { useRef, useState } from "react"
import "antd/dist/antd.css"
import { Form, Input, Button, Space, FormInstance } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { getClientsByParams } from "@DATA/api.service"

const CreateNewQuotation = () => {
  const [loadingStatus, setLoadingStatus] = React.useState(false)
  const [uiController, setUIController] = React.useState({
    userInfo: false,
    userInfoSwitch: false,
    shippingInfo: false,
  })
  const onFinish = (values: any) => {
    console.log("Received values of form:", values)
  }

  const [formInstance] = Form.useForm()

  return (
    <Form name="orderCreationForm" onFinish={onFinish} autoComplete="off" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }} form={formInstance}>
      <Form.Item label="User Selection">
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
              let currentFormValue = formInstance?.getFieldValue("client")
              if (!isNaN(currentFormValue.clientSearch)) {
                // if the string can be transform to number and bigger than 0, it must be a number.
                queryParam = { mobile: Number(currentFormValue.clientSearch) }
              } else {
                queryParam = { email: currentFormValue.clientSearch }
              }

              getClientsByParams(queryParam, setLoadingStatus, formInstance, setUIController, uiController)
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
        <Form.Item name={["client", "shippingAddress"]} style={{ display: "inline-block", width: "calc(35%)", paddingRight: "5px" }} rules={[{ required: true }]}>
          <Input disabled={uiController.userInfo} placeholder="Shipping Address" />
        </Form.Item>

        <Form.Item style={{ display: "inline-block" }}>
          <Button type="primary" block style={{}} onClick={() => {}}>
            {!uiController.userInfoSwitch ? "Create New User" : "Update User Info"}
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
          <Input placeholder="Please Input the client Email or Mobile Number" onChange={() => {}} />
        </Form.Item>
        <Form.Item name={["shipping", "postcode"]} style={{ display: "inline-block", width: "calc(10%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="postcode" />
        </Form.Item>
        <Form.Item name={["shipping", "shippingFee"]} style={{ display: "inline-block", width: "calc(15%)", paddingRight: "5px" }}>
          <Input disabled={uiController.userInfo} placeholder="shippingFee" />
        </Form.Item>

        <Form.Item style={{ display: "inline-block" }}>
          <Button type="primary" block style={{}} onClick={() => {}}>
            Comfirm Shipping Info
          </Button>
        </Form.Item>
      </Form.Item>

      <Form.List name="products">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: "flex" }} align="start" size={1}>
                <Form.Item {...restField} name={[name, "first"]} rules={[{ required: true, message: "Missing first name" }]}>
                  <Input
                    placeholder="First Name"
                    onChange={() => {
                      console.log(formInstance?.getFieldValue("users"))
                    }}
                  />
                </Form.Item>
                <Form.Item {...restField} name={[name, "last"]} rules={[{ required: true, message: "Missing last name" }]}>
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item {...restField} name={[name, "last"]} rules={[{ required: true, message: "Missing last name" }]}>
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item {...restField} name={[name, "last"]} rules={[{ required: true, message: "Missing last name" }]}>
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item {...restField} name={[name, "last"]} rules={[{ required: true, message: "Missing last name" }]}>
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item {...restField} name={[name, "last"]} rules={[{ required: true, message: "Missing last name" }]}>
                  <Input placeholder="Last Name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateNewQuotation
