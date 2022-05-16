import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bullet } from "@ant-design/plots";
import { Descriptions, Space } from "antd";

const MonthlyProgressCard = () => {
  const data = [
    {
      title: "Target",
      ranges: [40, 70, 100],
      measures: [80],
      target: 85,
    },
  ];
  const config = {
    data,
    measureField: "measures",
    rangeField: "ranges",
    targetField: "target",
    xField: "title",
    color: {
      range: ["#FFbcb8", "#FFe0b0", "#bfeec8"],
      measure: "#5B8FF9",
      target: "#39a3f4",
    },
    xAxis: {
      line: null,
    },
    yAxis: false,
    label: {
      target: false,
    },
  };
  //@ts-ignore
  return <Bullet {...config} style={{ height: "5rem" }} />;
};

export const MonthlyTargetDesc = () => {
  return (
    <Descriptions>
      <Descriptions.Item label="Target" labelStyle={{ width: "50px" }} contentStyle={{ width: "40px" }}>
        Aus$40000
      </Descriptions.Item>
    </Descriptions>
  );
};

export default MonthlyProgressCard;
