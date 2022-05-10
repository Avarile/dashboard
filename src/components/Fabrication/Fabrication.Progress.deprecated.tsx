import React, { useState } from "react";
import "antd/dist/antd.css";
import { Button, Steps } from "antd";
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from "@ant-design/icons";

const { Step } = Steps;

interface ICurrentProgress {
  currentStep: number;
  currentPercent: number;
}

const FabricationProgress = () => {
  const [currentProgress, setCurrentProgress] = useState<ICurrentProgress>({
    currentStep: 0,
    currentPercent: 0,
  });

  const progressForward = () => {
    setCurrentProgress({
      currentStep: currentProgress.currentStep + 1,
      currentPercent: currentProgress.currentPercent + 20,
    });
  };
  const progressBackWard = () => {
    setCurrentProgress({
      currentStep: currentProgress.currentStep - 1,
      currentPercent: currentProgress.currentPercent - 20,
    });
  };

  return (
    <>
      <Steps>
        <Step status="finish" title="Login" icon={<UserOutlined />} />
        <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
        <Step status="process" title="Pay" icon={<LoadingOutlined />} />
        <Step status="wait" title="Done" icon={<SmileOutlined />} />
      </Steps>
    </>
  );
};

export default FabricationProgress;
