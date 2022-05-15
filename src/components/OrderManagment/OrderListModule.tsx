import { Table, Input, Badge, Space } from "antd";
import "@SRC/pages/pages.css";
import { orderStatusIndicator, fabricationStatusIndicator, logisticStatusIndicator } from "@SRC/utils/utilFuncs";
import SingleOrderInListModule from "./SingleOrderInListModule";
import { getOrdersById } from "@SRC/data/api.service";
import React, { useState, useEffect } from "react";
import CreateOrderModal from "./CreateQuote.Modal";
import FlatSelectModuleForOrderScreen from "@SRC/utils/commomComponents/FlatSelectForOrderScreen.module ";
import styled from "styled-components";

const { Search } = Input;

const columns = [
  { title: "Order Number", dataIndex: "id", key: "orderNumber" },
  { title: "Client", dataIndex: "clientName", key: "clientName" },
  { title: "OrderAmount", dataIndex: "orderAmount", key: "orderAmount" },
  { title: "Amount payed", dataIndex: "orderPayed", key: "amountPayed" },
  {
    title: "Balance Due",
    dataIndex: "balanceDue",
    key: "balanceDue",
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
    title: "Payment Status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    render: (currentRowValue: any, currentColumnValue: any, index: number) => (
      <span>
        <Badge status={orderStatusIndicator(currentRowValue)} />
        {currentRowValue}
      </span>
    ),
  },
  {
    title: "Fabrication Status",
    dataIndex: "fabricationStatus",
    key: "fabricationStatus",
    render: (currentRowValue: any, currentColumnValue: any, index: number) => (
      <span>
        <Badge status={fabricationStatusIndicator(currentRowValue)} />
        {currentRowValue}
      </span>
    ),
  },
];

const OrderListModule = () => {
  const [data, setData] = useState<any>([]);
  const [searchParams, setSearchParams] = useState<any>({ orderId: "" });
  const [modalControll, setModalControll] = React.useState({
    loadingStatus: false,
    visible: false,
  });
  // const [loadingStatus, setLoadingStatus] = useState<boolean>(false); // I use this as a triggger to refresh the component if I updated the Amount payed, that's why I did the prop drilling

  const getOrderByIdandSetdata = () => {
    getOrdersById(searchParams).then((response: any) => {
      setData(
        response.map((item: any) => {
          const temp = { ...item };
          // flaten some of the values so they can be displayed
          // remember to get rid of them in AddPayment.Modal
          // console.log(temp);
          // console.log("useEffect is triggered");
          // debugger;
          return {
            ...temp,
            key: item.id,
            clientName: item.client.name,
            orderAmount: item.price.totalAmount,
          };
        })
      );
    });
  };
  useEffect(() => {
    getOrderByIdandSetdata();
  }, [searchParams]);
  // console.log(data);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Space style={{ margin: "0 2rem 3rem 2rem" }} size="small">
        <CreateOrderModal modalControll={modalControll} setModalControll={setModalControll} funcSwitch="create" />
      </Space>

      <SearchComponentContainer>
        <FlatSelectModuleForOrderScreen getOrder={getOrdersById} />
      </SearchComponentContainer>
      {/* <Search
        style={{ minWidth: "15rem", maxWidth: "20rem", marginBottom: "5rem", alignSelf: "flex-end", marginRight: "8rem" }}
        enterButton="search by OrderId"
        allowClear
        loading={false}
        onSearch={(value) => {
          setSearchParams(value);
        }}
      /> */}
      <Table
        // loading={loadingStatus}
        rowClassName={(record, index) => {
          if (index % 2 === 0) {
            return "warehousing-oddRow";
          } else return "warehousing-evenRow";
        }}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <SingleOrderInListModule order={record} getOrderByIdandSetdata={getOrderByIdandSetdata} />,
          // rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </div>
  );
};

export default OrderListModule;

const SearchComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;
