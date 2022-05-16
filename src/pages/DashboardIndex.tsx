import React from "react";
import styled from "styled-components";
import { orderStatusIndicator, fabricationStatusIndicator, logisticStatusIndicator } from "@SRC/utils/utilFuncs";
import { Table, Input, Badge, Space } from "antd";
import DashboardCard from "@SRC/utils/commomComponents/Dashboard.card";
import { title } from "process";
import AnimatedChartsModule, { Temp } from "@SRC/components/Dashboard/AnimatedCharts.module";
import PieChartModule from "@SRC/components/Dashboard/PieChart.module";
import WeeklyStatusReportCardsModule from "@SRC/components/Dashboard/StatusReportCards.module";
import DashboardOrderList from "@SRC/components/Dashboard/OrderList.module";

const DashboardIndex = () => {
  const [data, setData] = React.useState<any>([]);
  const [searchParams, setSearchParams] = React.useState<any>({ orderId: "" });
  return (
    <>
      <MainLayout>
        <WeeklyStatusReportCardsModule />
        <DashboardOrderList />
        <AnimiLayoutContainer>
          <AnimatedChartsModule />
          <PieChartModule />
        </AnimiLayoutContainer>
      </MainLayout>
    </>
  );
};

export default DashboardIndex;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AnimiLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  width: 100%;
  /* background-color: #303030; */
`;
