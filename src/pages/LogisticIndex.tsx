import { Table, Input, Badge, Select, Space } from "antd";
import "@SRC/pages/pages.css";
import { logisticStatusIndicator } from "@SRC/utils/utilFuncs";
import SingleLogisticModule from "@SRC/components/Logistic/SingleLogistic.Module";
import React, { useState, useEffect } from "react";
import FlatSelectModule from "@SRC/utils/commomComponents/FlatSelect.module";
import styled from "styled-components";
import { ILogisticSearchParams } from "@SRC/utils/interfaces";
import { getOrderByParams } from "@SRC/data/api.service";
import { logisticProvider } from "@SRC/utils/productTypes";
import LogisticInfoModal from "@SRC/components/Logistic/LogisticInfo.Modal";

const Logistic = () => {
  const [data, setData] = useState<any>([]);
  const [searchParams, setSearchParams] = useState<ILogisticSearchParams>({ logisticProvider: undefined, logisticStatus: undefined, id: undefined, pickupAt: undefined });
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [visible, setVisible] = React.useState<boolean>(false);

  const getOrder = (searchParams: ILogisticSearchParams) => {
    getOrderByParams(searchParams, setData, setLoadingStatus);
  };

  useEffect(() => {
    getOrderByParams(searchParams, setData, setLoadingStatus);
  }, []);

  const columns = [
    { title: "Order Number", dataIndex: "id", key: "orderNumber" },
    { title: "Order CreatedAt", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Tracking Numner",
      dataIndex: "trackingNumber",
      key: "trackingNumber",
    },
    {
      title: "Logistic Provider",
      dataIndex: "logisticProvider",
      key: "logisticProvider",
    },
    {
      title: "Logistic Status",
      dataIndex: "logisticStatus",
      key: "logisticStatus",
      render: (currentRowValue: any, currentColumnValue: any, index: number) => (
        <span>
          <Badge status={logisticStatusIndicator(currentRowValue)} />
          {currentRowValue}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "providerSelect",
      key: "providerSelect",
      render: (currentRowValue: any, currentColumnValue: any, index: number) => {
        return (
          <Space size="middle">
            <a
              onClick={() => {
                setVisible(true);
              }}>
              Update Info
            </a>
            <LogisticInfoModal visible={visible} setVisible={setVisible} order={currentColumnValue} setLoadingStatus={setLoadingStatus} />
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <SearchComponentContainer>
          <FlatSelectModule loadingStatus={loadingStatus} getOrder={getOrder} setSearchParams={setSearchParams} />
        </SearchComponentContainer>
        <h3>Logistic Status</h3>
        <Table
          loading={loadingStatus}
          rowClassName={(record, index) => {
            if (index % 2 === 0) {
              return "warehousing-oddRow";
            } else return "warehousing-evenRow";
          }}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => <SingleLogisticModule order={record} getOrder={getOrder} />,
            // rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default Logistic;

const SearchComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
