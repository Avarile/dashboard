import React, { useRef } from "react";
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, FormInstance } from "antd";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
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
};
/* eslint-enable no-template-curly-in-string */

const WarehousingInbound = () => {
  // useRef example usage as  refering an instance of a component
  // 1st step: create a ref
  const ref = useRef<FormInstance<any> | null>();

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      style={{ width: "100%" }}
      //ref need to receive a instance of a component using a function to pass it into the current state of the ref.
      ref={(formInstance: FormInstance<any> | null) => {
        ref.current = formInstance;
      }}
    >
      <Form.Item
        name={["user", "name"]}
        label="Product Name"
        rules={[
          {
            required: true,
            message: "Please input product name",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["Product code"]}
        label="Product Code"
        rules={[
          {
            required: true,
            message:
              "must provide how many products has been deposite into the warehouse",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["user", "age"]}
        label="Age"
        rules={[
          {
            type: "number",
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={["user", "website"]} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={["user", "introduction"]} label="Introduction">
        <Input.TextArea style={{ minHeight: "20rem", maxHeight: "25rem" }} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button
          onClick={() => {
            ref.current?.resetFields();
          }}
        >
          Reset Form
        </Button>
      </Form.Item>
    </Form>
  );
};
export default WarehousingInbound;
