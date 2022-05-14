import React from "react";
import { Steps, Button, message, Input } from "antd";
import styled from "styled-components";
import { LoadingOutlined, PayCircleOutlined } from "@ant-design/icons";
import { updateOrderForFabrication } from "@SRC/data/api.service";

const { TextArea } = Input;
const { Step } = Steps;

const steps = [
  {
    id: 0,
    title: "Waiting For Material",
    content: "Shortage of Material, waiting for resupply",
    subtitle: "Contact factory to resupply",
    percent: "0%",
    value: "pending",
  },
  {
    id: 1,
    title: "Machining items",
    content: "During machining procedures",
    subtitle: "Items is in the workshop",
    percent: "15%",
    value: "machineProcessing",
  },
  {
    id: 2,
    title: "Machine Finished",
    content: "Ready for next procedure",
    subtitle: "Items is in the workshop",
    percent: "30%",
    value: "machineProcessFinished",
  },
  {
    id: 3,
    title: "PowderCoating",
    content: "During PowderCoating procedures, Normally this took 2~3 weeks",
    subtitle: "Items is in the PowderCoating Factory",
    percent: "45%",
    value: "powderCoating",
  },
  {
    id: 4,
    title: "PowderCoating Finished",
    content: "Ready for next procedure",
    subtitle: "Items return from the factory to the workshop",
    percent: "70%",
    value: "powderCoatingFinished",
  },
  {
    id: 5,
    title: "Waiting for Installation",
    content: "Contact clients to book in!",
    subtitle: "Items is in the workshop, wainting to be installed",
    percent: "85%",
    value: "waitingForInstallation",
  },
  {
    id: 6,
    title: "Installing",
    content: "During Installation procedures, Installation normally took 2days",
    subtitle: "Installation",
    percent: "90%",
    value: "installing",
  },
  {
    id: 7,
    title: "Ready",
    content: "Ready for pickup",
    subtitle: "Everything is ready",
    percent: "100%",
    value: "ready",
  },
];

export default function SingleFabJobInListModule({ order, getOrderByIdandSetdata }: any) {
  const getCurrentFabIdOutofOrder = (): number => {
    let id = 0;
    for (let item of steps) {
      if (item.value === order.fabricationStatus) {
        id = item.id;
        return id;
      }
    }
    return id;
  };

  const [current, setCurrent] = React.useState<number>(getCurrentFabIdOutofOrder());
  const [fabricationInfo, setFabricationInfo] = React.useState<string>(order.fabricationInfo);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const updateFabStatus = async () => {
    let payload = {
      ...order,
      fabricationStatus: steps[current].value,
      fabricationInfo: fabricationInfo,
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
      <StepContent>
        <TextAreaContainer>
          <TextAreaNew
            autoSize={{ minRows: 20, maxRows: 10 }}
            showCount
            maxLength={2000}
            rows={20}
            value={fabricationInfo}
            onChange={(event) => {
              setFabricationInfo(event.target.value);
            }}
          />
        </TextAreaContainer>
        <TextAreaContainer>
          <TextAreaNew autoSize={{ minRows: 20, maxRows: 10 }} rows={20} maxLength={2000} value={steps[current].content} showCount />
        </TextAreaContainer>
      </StepContent>
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
  background-color: #fafafa;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
`;

const StepAction = styled.div`
  margin-top: 24px;
`;

const TextAreaContainer = styled.div``;

const TextAreaNew = styled(TextArea)`
  flex: 0 1 auto;
  margin: 2rem;
  width: 90%;
  height: 200;
  align-items: center;
  resize: none;
`;

const DisplayContentContainer = styled.p`
  margin: 2rem;
`;
