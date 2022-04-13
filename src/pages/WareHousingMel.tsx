import React from "react";
import "antd/dist/antd.css";
import { Table, Badge, Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { stockIndicator } from "@SRC/utils/utilFuncs";

/**
 *the menu at the end of the action as well as anywhere else.
 * @return {MenuItem}
 */
const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

function WareHousingMel() {
  /**
   * Rows been expanded definition
   *
   */
  const expandedRowRender = () => {
    // create Ref
    // const tableRef = React.useRef();
    const columns = [
      // inner row columns
      { title: "SKU", dataIndex: "sku", key: "sku" },
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Price", dataIndex: "price", key: "price" },
      {
        title: "In Stock",
        key: "inStock",
        dataIndex: "inStock",
        render: () => (
          <span>
            <Badge status="success" />
            123
          </span>
        ),
      },
      { title: "last Update", dataIndex: "lastUpdate", key: "lastUpdate" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 6; ++i) {
      data.push({
        key: i,
        sku: `TB0${i}-${i}s`,
        name: `ProductName${i}`,
        price: 2300,
        inStocck: () => {
          return Math.floor(Math.random() * 10);
        },
        lastUpdate: Date.now() / 1000,
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Platform", dataIndex: "platform", key: "platform" },
    { title: "Version", dataIndex: "version", key: "version" },
    { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
    { title: "Creator", dataIndex: "creator", key: "creator" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt" },
    { title: "Action", key: "operation", render: () => <a>Publish</a> },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: "Screem",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00",
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <div>
        {" "}
        <p>SearchBar placeHolder underConstruction</p>
      </div>
      <Table
        // tableRef={(tableInstance: any) => {
        //   tableRef.current = tableInstance;
        // }}
        className="components-table-demo-nested"
        columns={columns} // this is pretty straight forward this is cloumns
        expandable={{ expandedRowRender }} // and this is the expanderable Row
        dataSource={data} // dataSourse
        bordered={false}
      />
    </div>
  );
}

export default WareHousingMel;
