import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";
import DashboardCard from "@SRC/utils/commomComponents/Dashboard.card";

const PieChart = () => {
  const data = [
    {
      type: "Product",
      value: 65,
    },
    {
      type: "PowderCoating",
      value: 24,
    },
    {
      type: "Installation",
      value: 19,
    },
    {
      type: "Logistic",
      value: 12,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

const PieChartModule = () => {
  return DashboardCard({ title: "Cost Percentige", style: { flexGrow: 1, height: "32rem" }, Content: <PieChart /> });
};

export default PieChartModule;
