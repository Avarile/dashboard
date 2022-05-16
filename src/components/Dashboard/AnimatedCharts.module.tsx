import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line } from "@ant-design/plots";
import DashboardCard from "@SRC/utils/commomComponents/Dashboard.card";
import { AnimatedLineData } from "@SRC/utils/Data";

export const Temp = () => {
  const config = {
    data: AnimatedLineData,
    xField: "month",
    yField: "amount",
    seriesField: "cost",
    yAxis: {
      label: {
        formatter: (v: any) => `${v} Aus$`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };
  //@ts-ignore
  return <Line {...config} />;
};

const AnimatedChartsModule = () => {
  return DashboardCard({ title: "Anunal Sales Grid Status", style: { flexGrow: 1, height: "32rem" }, Content: <Temp /> });
};

export default AnimatedChartsModule;
