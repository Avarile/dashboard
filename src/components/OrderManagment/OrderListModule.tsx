import { Table, Input, Badge } from "antd";
import "@SRC/pages/pages.css";
import { orderStatusIndicator } from "@SRC/utils/utilFuncs";
import SingleOrderInListModule from "./SingleOrderInListModule";
import { getOrdersById } from "@SRC/data/api.service";
import React, { useState, useEffect } from "react";

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
    title: "Order Status",
    dataIndex: "orderStatus",
    key: "orderStatus",
    render: (currentRowValue: any, currentColumnValue: any, index: number) => (
      <span>
        <Badge status={orderStatusIndicator(currentRowValue)} />
        {currentRowValue}
      </span>
    ),
  },
];

const OrderListModule = () => {
  const [data, setData] = useState<any>([]);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false); // I use this as a triggger to refresh the component if I updated the Amount payed, that's why I did the prop drilling

  console.log(loadingStatus);

  useEffect(() => {
    getOrdersById({ orderId: "" }).then((response: any) => {
      setData(
        response.map((item: any) => {
          const temp = { ...item };
          // flaten some of the values so they can be displayed
          // remember to get rid of them in AddPayment.Modal
          return {
            ...temp,
            key: item.id,
            clientName: item.client.name,
            orderAmount: item.price.totalAmount,
          };
        })
      );
    });
  }, []);
  console.log(data);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Search
        style={{ minWidth: "15rem", maxWidth: "20rem", marginBottom: "5rem", alignSelf: "flex-end", marginRight: "8rem" }}
        enterButton="search by OrderId"
        allowClear
        loading={false}
        onSearch={(value) => {
          getOrdersById({ orderId: value }).then((response: any) => {
            setData(
              response.map((item: any) => {
                const temp = { ...item };
                return { ...temp, key: item.id };
              })
            );
          });
        }}
      />
      <Table
        loading={loadingStatus}
        rowClassName={(record, index) => {
          if (index % 2 === 0) {
            return "warehousing-oddRow";
          } else return "warehousing-evenRow";
        }}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <SingleOrderInListModule order={record} setLoadingStatus={setLoadingStatus} />,
          // rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </div>
  );
};

export default OrderListModule;
