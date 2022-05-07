import { Table, Input, Badge } from "antd";
import "@SRC/pages/pages.css";
import { orderStatusIndicator } from "@SRC/utils/utilFuncs";
import SingleOrderInListModule from "./SingleOrderInListModule";

const { Search } = Input;

const columns = [
  { title: "Order Number", dataIndex: "id", key: "orderNumber" },
  { title: "Client", dataIndex: "clientName", key: "clientName" },
  { title: "OrderAmount", dataIndex: "orderAmount", key: "orderAmount" },
  { title: "Amount payed", dataIndex: "amountPayed", key: "amountPayed" },
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

const data = [
  {
    key: 1,
    id: 1,
    clientName: "Avarile",
    orderAmount: 57000,
    amountPayed: 0,
    orderStatus: "pending",
    balanceDue: 8700,
  },
  {
    key: 2,
    id: 2,
    clientName: "Avarile",
    orderAmount: 57000,
    amountPayed: 0,
    orderStatus: "delivered",
    balanceDue: 8700,
  },
  {
    key: 3,
    id: 3,
    clientName: "Avarile",
    orderAmount: 57000,
    amountPayed: 0,
    orderStatus: "deposit payed",
    balanceDue: 8700,
  },
  {
    key: 4,
    id: 4,
    clientName: "Avarile",
    orderAmount: 57000,
    amountPayed: 0,
    orderStatus: "fullyPayed(Not yet deliverd)",
    balanceDue: 8700,
  },
];

const OrderListModule = () => (
  <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
    <Search style={{ minWidth: "15rem", maxWidth: "20rem", marginBottom: "5rem", alignSelf: "flex-end", marginRight: "8rem" }} enterButton="search" allowClear loading={false} />
    <Table
      rowClassName={(record, index) => {
        if (index % 2 === 0) {
          return "warehousing-oddRow";
        } else return "warehousing-evenRow";
      }}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => <SingleOrderInListModule />,
        // rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={data}
    />
  </div>
);

export default OrderListModule;
