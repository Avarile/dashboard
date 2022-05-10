import dayjs from "dayjs";
import React from "react";
import { Table, Badge } from "antd";

const data = [
  {
    key: "0001",
    status: "ongoing",
    implementation: "shenji4-it",
    finishAt: dayjs("2022-05-10").format("DD/MM/YYYY"),
  },
  {
    key: "0002",
    status: "ongoing",
    implementation: "shenji4-it",
    finishAt: dayjs("2022-05-10").format("DD/MM/YYYY"),
  },
];

export default () => {
  const columns = [
    // inner row columns

    { title: "Key", dataIndex: "key", key: "key" },
    { title: "Deadline", dataIndex: "finishAt", key: "finishAt" },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (a: any, b: any, c: any) => {
        // a: current row value, b: current column value(a obj), c: row index

        return (
          <span>
            <Badge status="processing" />
            {a}
          </span>
        );
      },
    },
    { title: "Implementation", dataIndex: "implementation", key: "implementation" },
  ];
  return (
    <>
      <Table
        // size="small"
        style={{ width: "100%" }}
        onRow={(record) => {
          return {
            onClick: (event) => {}, // 点击行
            onDoubleClick: (event) => {},
            onContextMenu: (event) => {},
            onMouseEnter: (event) => {
              // setHoverEvent(true);
            }, // mouseIn
            onMouseLeave: (event) => {
              // setHoverEvent(false);
            },
          };
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record, index) => {
          if (index % 2 === 0) {
            return "warehousing-oddRow";
          } else return "warehousing-evenRow";
        }}
      />
    </>
  );
};
