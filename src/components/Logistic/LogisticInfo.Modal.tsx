import { Modal, Form, Input, InputNumber, Button, DatePicker, FormInstance, Select } from "antd";
import React from "react";
import { IlogisticInfo } from "@SRC/utils/interfaces";
import { updateOrderForLogisticInfo } from "@SRC/data/api.service";
import { logisticProvider } from "@SRC/utils/productTypes";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
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

const LogisticInfoModal = ({ visible, setVisible, order, setLoadingStatus }: any) => {
  const [formInstance] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");
  // const [payload, setPayload] = React.useState<IlogisticInfo>({
  //   logisticProvider: "",
  //   trackingNumber: "",
  //   pickupAt: new Date(),
  //   logisticSideNote: "",
  // });

  const payloadRef = React.useRef<IlogisticInfo>({
    logisticProvider: "",
    trackingNumber: "",
    pickupAt: new Date(),
    logisticSideNote: "",
  });

  const onFinish = (values: any) => {
    debugger;
    setLoadingStatus(true);
    const currentFormValue: IlogisticInfo = formInstance.getFieldValue("logistic");
    payloadRef.current = {
      logisticProvider: currentFormValue.logisticProvider,
      trackingNumber: currentFormValue.trackingNumber,
      pickupAt: payloadRef.current.pickupAt,
      logisticSideNote: currentFormValue.logisticSideNote,
    };
    order = {
      ...order,
      ...payloadRef.current,
    };
    updateOrderForLogisticInfo(order.id, order)
      .then(() => {
        setTimeout(() => {
          setLoadingStatus(false);
        }, 2000);
      })
      .then(() => {
        formInstance.resetFields();
      });
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const getDate = (value: any, date: any) => {
    console.log(`the Date value is: ${value}, the Date is ${date}`);
    return date;
  };

  return (
    <>
      <Modal title="Logistic Info" visible={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel}>
        {/* <p>{modalText}</p> */}
        <Form {...layout} name="logisticInfo" onFinish={onFinish} validateMessages={validateMessages} form={formInstance}>
          <Form.Item name={["logistic", "logisticProvider"]} label="Provider" rules={[{ required: true }]}>
            <Select>
              {logisticProvider.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.name}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name={["logistic", "trackingNumber"]} label="trackingNumber" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={["logistic", "pickupAt"]} label="Parcel Pickup at" rules={[{ required: true }]}>
            <DatePicker
              format="YYYY-MM-DD"
              onChange={(value, date) => {
                payloadRef.current = {
                  ...payloadRef.current,
                  pickupAt: getDate(value, date),
                };
                // setPayload({
                //   ...payloadRef,
                //   pickupAt: getDate(value, date),
                // });
              }}
            />
          </Form.Item>
          <Form.Item name={["logistic", "logisticSideNote"]} label="SideNote">
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              onClick={(values) => {
                onFinish(values);
              }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LogisticInfoModal;
