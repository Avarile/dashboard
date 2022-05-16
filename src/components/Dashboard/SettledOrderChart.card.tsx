import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { RingProgress } from "@ant-design/plots";
import { Descriptions } from "antd";

const TransferRatesDesc = () => {
  return (
    <Descriptions style={{ marginTop: "50px" }}>
      <Descriptions.Item labelStyle={{ width: "50px" }} contentStyle={{ width: "40px" }}>
        26 out of 198 Quotes is Settled
      </Descriptions.Item>
    </Descriptions>
  );
};

const SettledOrderChart = () => {
  const config = {
    height: 100,
    width: 100,
    autoFit: false,
    percent: 0.13,
    color: ["#F4664A", "#E8EDF3"],
    innerRadius: 0.85,
    radius: 0.98,
    statistic: {
      title: {
        style: {
          color: "#363636",
          fontSize: "12px",
          lineHeight: "14px",
        },
        formatter: () => "Transfer Rate",
      },
    },
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <RingProgress {...config} />
        <TransferRatesDesc />
      </div>
    </>
  );
};

export default SettledOrderChart;
