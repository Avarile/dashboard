import React from "react";
import { Steps, Button, message } from "antd";
import styled from "styled-components";
import { LoadingOutlined, PayCircleOutlined } from "@ant-design/icons";
import { updateOrderForFabrication } from "@SRC/data/api.service";

const { Step } = Steps;

const steps = [
  {
    id: 0,
    title: "Waiting For Material",
    content: "Shortage of Material, waiting for resupply",
    subtitle: "Contact factory to resupply",
    percent: "0%",
  },
  {
    id: 1,
    title: "Machining items",
    content: "During machining procedures",
    subtitle: "Items is in the workshop",
    percent: "15%",
  },
  {
    id: 2,
    title: "Machine Finished",
    content: "Ready for next procedure",
    subtitle: "Items is in the workshop",
    percent: "30%",
  },
  {
    id: 3,
    title: "PowderCoating",
    content: "During PowderCoating procedures",
    subtitle: "Items is in the PowderCoating Factory",
    percent: "45%",
  },
  {
    id: 4,
    title: "PowderCoating Finished",
    content: "Ready for next procedure",
    subtitle: "Items return from the factory to the workshop",
    percent: "70%",
  },
  {
    id: 5,
    title: "Waiting for Installation",
    content: "Contact clients to book in!",
    subtitle: "Items is in the workshop, wainting to be installed",
    percent: "85%",
  },
  {
    id: 6,
    title: "Installing",
    content: "During Installation procedures",
    subtitle: "Installation",
    percent: "90%",
  },
  {
    id: 7,
    title: "Ready",
    content: "Ready for pickup",
    subtitle: "Everything is ready",
    percent: "100%",
  },
];

export default function SingleFabJobInListModule({ order, getOrderByIdandSetdata }: any) {
  const getCurrentFabIdOutofOrder = (): number => {
    let id = 0;
    for (let item of steps) {
      if (item.title === order.fabricationStatus) {
        id = item.id;
        return id;
      }
    }
    return id;
  };

  const [current, setCurrent] = React.useState<number>(getCurrentFabIdOutofOrder());

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const updateFabStatus = async () => {
    let payload = {
      ...order,
      fabricationStatus: steps[current].title,
    };
    await updateOrderForFabrication(order.id, payload).then(getOrderByIdandSetdata());
  };

  return (
    <>
      <Steps current={current} size="small">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} description={item.subtitle} icon={current === item.id && <LoadingOutlined />} />
        ))}
      </Steps>
      <StepContent>{steps[current].content}</StepContent>
      <StepAction>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success("Processing complete!")}>
            Production Finished
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        <Button
          danger
          type="primary"
          style={{ margin: "0 8px" }}
          onClick={() => {
            updateFabStatus();
          }}>
          Comfirm Status Change
        </Button>
      </StepAction>
    </>
  );
}

const StepContent = styled.div`
  min-height: 200px;
  margin-top: 16px;
  padding-top: 80px;
  text-align: center;
  background-color: #fafafa;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
`;

const StepAction = styled.div`
  margin-top: 24px;
`;
