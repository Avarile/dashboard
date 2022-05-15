import { Modal, Button, Space } from "antd";
import React from "react";
import CreateNewQuotation from "./CreateQuoteForm";

const CreateOrderModal = ({
  modalControll,
  setModalControll,
  funcSwitch,
}: {
  modalControll: { loadingStatus: boolean; visible: boolean };
  setModalControll: (agr: any) => void;
  funcSwitch: "create" | "edit";
}) => {
  const showModal = () => {
    setModalControll({
      ...modalControll,
      visible: true,
    });
  };

  const handleOk = () => {
    setModalControll({
      ...modalControll,
      loadingStatus: true,
    });
    setTimeout(() => {
      setModalControll({ loadingStatus: false, visible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setModalControll({
      ...modalControll,
      visible: false,
    });
  };

  return (
    <>
      <Button type="dashed" onClick={showModal}>
        Create Order
      </Button>
      <Modal
        visible={modalControll.visible}
        title={funcSwitch === "create" ? "Create Order" : "Edit Order"}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1680}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={modalControll.loadingStatus} onClick={handleOk}>
            Submit
          </Button>,
          <Button key="link" href="https://google.com" type="primary" loading={modalControll.loadingStatus} onClick={handleOk}>
            Search on Google
          </Button>,
        ]}>
        <CreateNewQuotation />
      </Modal>
    </>
  );
};

export default CreateOrderModal;
