import React from "react"
import "antd/dist/antd.css"
import { Table, Badge, Menu, Dropdown, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { stockIndicator } from "@SRC/utils/utilFuncs"

/**
 *the menu at the end of the action as well as anywhere else.
 * @return {MenuItem}
 */
const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
)

const ExpandableTable = () => {
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
      render: (a: any, b: any, c: any) => {
        // a: current row value, b: current column value(a obj), c: row index
        debugger

        return (
          <span>
            <Badge status={stockIndicator(a)} />
            {a}
          </span>
        )
      },
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
  ]

  const data: any[] = []
  for (let i = 0; i < 6; ++i) {
    data.push({
      key: i,
      sku: `TB0${i}-${i}s`,
      name: `ProductName${i}`,
      price: 2300,
      inStock: 5,
      lastUpdate: Date.now() / 1000,
    })
  }
  return <Table columns={columns} dataSource={data} pagination={false} />
}

export default ExpandableTable
