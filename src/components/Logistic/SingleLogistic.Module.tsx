import React from "react";
import { Steps, Button, message, Input } from "antd";
import styled from "styled-components";
import { LoadingOutlined } from "@ant-design/icons";
import { updateOrderForLogistic } from "@SRC/data/api.service";

const { TextArea } = Input;
const { Step } = Steps;

const steps = [
  {
    id: 0,
    title: "Waiting For Carrier",
    content: "Item packaged, Waiting for Carrier company to collect it.",
    subtitle: "Contact Carrier company",
    percent: "0%",
    value: "waitingForCarrier",
  },
  {
    id: 1,
    title: "Already pickedUp",
    content: "Carrier company already collected item.",
    subtitle: "Items is in the depot",
    percent: "15%",
    value: "pickupAlready",
  },
  {
    id: 2,
    title: "Delivering in Progress",
    content: "Delivering",
    subtitle: "Items is being delivering!",
    percent: "30%",
    value: "delivering",
  },
  {
    id: 3,
    title: "Delivered",
    content: "Item already delivered to the depot or client's designated address.",
    subtitle: "Already delivered",
    percent: "45%",
    value: "delivered",
  },
  {
    id: 4,
    title: "Cannot deliver!",
    content: "Wrong Address or no one in the house.",
    subtitle: "Something wrong!",
    percent: "70%",
    value: "cannotDeliver",
  },
  {
    id: 5,
    title: "Returing to Vender",
    content: "Cannot deliver, item returning to vender!",
    subtitle: "Returning!",
    percent: "85%",
    value: "returningToVender",
  },
  {
    id: 6,
    title: "Item Returned",
    content: "Returned Item Received!",
    subtitle: "Returned",
    percent: "90%",
    value: "returnedItemArrived",
  },
  {
    id: 7,
    title: "Item Damaged",
    content: "Item Damaged during transpotation, consideration compensation to the client as an option, or return the item! and send a new one",
    subtitle: "Damaged",
    percent: "100%",
    value: "itemDamagedInTransport",
  },
];

export default function SingleLogisticModule({ order, getOrder }: any) {
  const getCurrentLogiIdOutofOrder = (): number => {
    let id = 0;
    for (let item of steps) {
      if (item.value === order.logisticStatus) {
        id = item.id;
        return id;
      }
    }
    return id;
  };

  const [current, setCurrent] = React.useState<number>(getCurrentLogiIdOutofOrder());
  const [logisticInfo, setLogisticInfo] = React.useState<string>(order.logisticStatus);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const updateFabStatus = async () => {
    let payload = {
      ...order,
      logisticStatus: steps[current].value,
      // fabricationInfo: fabricationInfo,
    };
    await updateOrderForLogistic(order.id, payload).then(getOrder());
  };

  return (
    <>
      <Steps current={current} size="small">
        {steps.map((item) => (
          <Step
            key={item.title}
            title={item.title}
            description={item.subtitle}
            // nested Ternary expression
            icon={item.id >= 4 ? null : item.id === current && <LoadingOutlined />}
            // status={current === item.id && item.id > 4 ? "error" : "process"}
            status={current === item.id && item.id >= 4 ? "error" : "process"}
          />
        ))}
      </Steps>
      <StepContent>
        <TextAreaContainer>
          <TextAreaNew
            autoSize={{ minRows: 20, maxRows: 10 }}
            showCount
            maxLength={2000}
            rows={20}
            value={logisticInfo}
            onChange={(event) => {
              setLogisticInfo(event.target.value);
            }}
          />
        </TextAreaContainer>
        <TextAreaContainer>
          <TextAreaNew autoSize={{ minRows: 20, maxRows: 10 }} rows={20} maxLength={2000} value={steps[current].content} showCount />
        </TextAreaContainer>
      </StepContent>
      <StepAction>
        {current < steps.length - 1 && (
          <Button type="primary" style={{ width: "6rem" }} onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" style={{ width: "6rem" }} onClick={() => message.success("Processing complete!")}>
            Finished
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
