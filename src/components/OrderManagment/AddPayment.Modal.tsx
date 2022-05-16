import React from "react";
import { Modal, Form, Input, InputNumber, Button, Select } from "antd";
import { updateOrderForPayment } from "@SRC/data/api.service";
import { deductFromCurrentStock, timeStamp } from "@SRC/utils/utilFuncs";
import { IOrderProduct } from "@SRC/utils/interfaces";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddPaymentModal = ({ showPaymentModal, setShowPaymentModal, orderDetail, getOrderByIdandSetdata }: any) => {
  const order = { ...orderDetail };
  // remove the flatened key/value in OrderListModule
  // delete order.key;
  // delete order.clientName;
  // delete order.orderAmount;
  // console.log(order);

  // on a second thought, I decide not to move them for we still need them for rendering

  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("");
  const [formRef] = Form.useForm();

  const handleOk = () => {
    setModalText("Please Wait while System is handling payment");
    setConfirmLoading(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      setConfirmLoading(false);
      const currentFormValue = formRef.getFieldValue("payment");
      // console.log("currentForm:", currentFormValue, "orderPayed:", order.orderPayed, "orderDeposit:", order.orderDeposit);

      //process data before submit: calc the numbers
      const payload = {
        ...order,
        paymentDetail: [...order.paymentDetail, { ...currentFormValue, payedAt: timeStamp() }],
        orderPayed: currentFormValue.amount + order.orderPayed,
        balanceDue: order.price.totalAmount - order.orderPayed - currentFormValue.amount,
        orderStatus: order.orderPayed + currentFormValue.amount >= order.price.totalAmount ? "fullyPayed" : "partiallyPayed",
      };
      console.log(payload);
      // if the amount is fully payed, then need to deduct the product from the stock
      for (let product of payload.products) {
        deductFromCurrentStock(product);
      }

      updateOrderForPayment(orderDetail.id, payload).then(() => {
        formRef.resetFields(); // reset form after submit
        getOrderByIdandSetdata();
      });
    }, 2000);
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

  // IMPORTANT : here I put setLoadingStatu in afterClose is cuz I need to trigger a re-render for orderListModule after the modal is closed --- while modal is still open, the re-render is not going to happen.
  // above is not working!!!!!!
  return (
    <>
      <Modal
        title="Add Payment"
        visible={showPaymentModal}
        okText="Submit"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        mask
        maskClosable={false}
        keyboard={false}
        afterClose={() => {
          // window.location.reload();
        }}>
        <p>{modalText}</p>{" "}
        <Form {...layout} name="addPaymentForm" form={formRef} validateMessages={validateMessages}>
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
            <InputNumber />
          </Form.Item>
          <Form.Item name={["payment", "referenceCodes"]} label="Reference Codes">
            <Input />
          </Form.Item>
          <Form.Item name={["payment", "description"]} label="Description">
            <Input.TextArea rows={8} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPaymentModal;
