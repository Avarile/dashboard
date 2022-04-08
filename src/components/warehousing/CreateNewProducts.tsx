import React, { useRef } from "react";
import "antd/dist/antd.css";
import { Form, Input, InputNumber, Button, FormInstance } from "antd";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const CreateNewItem = () => {
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
      // validateMessages={validateMessages}
      style={{ minWidth: "80rem" }}
      //ref need to receive a instance of a component using a function to pass it into the current state of the ref.
      ref={(formInstance: FormInstance<any> | null) => {
        ref.current = formInstance;
      }}
    >
      <Form.Item
        name={["product", "productName"]}
        label="Product Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["product", "productSKU"]}
        label="SKU"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["product", "productSize"]}
        label="Size"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["product", "productPrice"]}
        label="Price"
        rules={[
          {
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["product", "productPowderCoatingPrice"]}
        label="PowderCoatingPrice"
        rules={[
          {
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={["product", "productPowderInstallationPrice"]}
        label="InstallationPrice"
        rules={[
          {
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={["product", "productDescription"]} label="Description">
        <Input.TextArea style={{ minHeight: "10rem", maxHeight: "25rem" }} />
      </Form.Item>
      <Form.Item
        name={["product", "productSpecification"]}
        label="Specification"
      >
        <Input.TextArea style={{ minHeight: "10rem", maxHeight: "25rem" }} />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
        <Button
          onClick={() => {
            ref.current?.resetFields();
          }}
          block
        >
          Reset Form
        </Button>
      </Form.Item>
    </Form>
  );
};
export default CreateNewItem;
