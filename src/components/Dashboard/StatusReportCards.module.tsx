import React from "react";
import styled from "styled-components";
import DashboardCard from "@SRC/utils/commomComponents/Dashboard.card";
import { Statistic, Space, Descriptions } from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
import SettledOrderChartCard from "./SettledOrderChart.card";
import MonthlyProgressCard, { MonthlyTargetDesc } from "./MonthlyTarget.card";
import ProductListCard from "./ProductList.card";

const SalesAmount = () => {
  return DashboardCard({
    title: "Weekly Sale State",
    style: { flexGrow: 1, height: "12rem" },
    Content: (
      <>
        <h2>$42087</h2>
        <Space>
          <Statistic title="Compare to last Week" value="17" precision={2} valueStyle={{ color: "#3f8600", fontSize: "1rem" }} prefix={<CaretUpOutlined />} suffix="%" />
          <Statistic title="Surplus" value="2860" precision={2} valueStyle={{ color: "#861900", fontSize: "1rem" }} prefix={<CaretUpOutlined />} suffix="AUS$" />
        </Space>
      </>
    ),
  });
};

const OrderTransChart = () => {
  return DashboardCard({
    title: "Order Tranfer Rates",
    style: { flexGrow: 1, height: "12rem" },
    Content: (
      <>
        <SettledOrderChartCard />
      </>
    ),
  });
};

const SettledOrderChart1 = () => {
  return DashboardCard({
    title: "Monthly SalesTarget",
    style: { flexGrow: 1, height: "12rem" },
    Content: (
      <>
        <MonthlyProgressCard />
        <MonthlyTargetDesc />
      </>
    ),
  });
};

const SettledOrderChart2 = () => {
  return DashboardCard({
    title: "Products List",
    style: { flexGrow: 1, height: "12rem" },
    Content: (
      <>
        <ProductListCard />
      </>
    ),
  });
};

export default function WeeklyStatusReportCardsModule() {
  return (
    <StatusReportContainer>
      {SalesAmount()}
      {OrderTransChart()}
      {SettledOrderChart1()}
      {SettledOrderChart2()}
    </StatusReportContainer>
  );
}

const StatusReportContainer = styled.div`
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
`;
