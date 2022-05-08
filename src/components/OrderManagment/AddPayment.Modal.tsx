import React from "react";
import { Modal, Form, Input, InputNumber, Button, Select } from "antd";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddPaymentModal = ({ showPaymentModal, setShowPaymentModal }: any) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");

  // const showModal = () => {
  //   setVisible(true);
  // };

  const handleOk = () => {
    setModalText("Please Wait while System is handling payment");
    setConfirmLoading(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const onFinish = (values: any) => {
    console.log(values);
  };
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
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setShowPaymentModal(false);
  };

  return (
    <>
      <Modal title="Add Payment" visible={showPaymentModal} okText="Submit" onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel} mask maskClosable={false}>
        <p>{modalText}</p>{" "}
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name={["payment", "method"]} label="Method" rules={[{ required: true }]}>
            <Select placeholder="Please select payment method!">
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="debitCard">Debit Card</Select.Option>
              <Select.Option value="creditCard">Credit Card</Select.Option>
              <Select.Option value="paypal">Paypal</Select.Option>
              <Select.Option value="3rdParty">3rd-Party Payment</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={["payment", "amount"]} label="Amount" rules={[{ type: "number", required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={["payment", "referenceCodes"]} label="Reference Codes" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={["payment", "description"]} label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPaymentModal;
