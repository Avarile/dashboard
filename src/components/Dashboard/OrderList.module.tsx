import { Table } from "antd";
import React from "react";
import DashboardCard from "@SRC/utils/commomComponents/Dashboard.card";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Chinese Score",
    dataIndex: "chinese",
    sorter: {
      compare: (a: any, b: any) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Math Score",
    dataIndex: "math",
    sorter: {
      compare: (a: any, b: any) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "English Score",
    dataIndex: "english",
    sorter: {
      compare: (a: any, b: any) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "English Score",
    dataIndex: "english",
    sorter: {
      compare: (a: any, b: any) => a.english - b.english,
      multiple: 1,
    },
  },
  {
    title: "English Score",
    dataIndex: "english",
    sorter: {
      compare: (a: any, b: any) => a.english - b.english,
      multiple: 1,
    },
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: "2",
    name: "Jim Green",
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: "3",
    name: "Joe Black",
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: "4",
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
  },
  {
    key: "5",
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
  },
  {
    key: "6",
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
  },
  {
    key: "7",
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
  },
];

function onChange(pagination: any, filters: any, sorter: any, extra: any) {
  console.log("params", pagination, filters, sorter, extra);
}

const DashboardOrderList = () => {
  return DashboardCard({
    title: "Products List",
    style: { flexGrow: 1, marginBottom: "1rem" },
    Content: (
      <>
        <Table columns={columns} dataSource={data} onChange={onChange} />;
      </>
    ),
  });
};

export default DashboardOrderList;
