import React from "react"
import "antd/dist/antd.css"
import { Table, Tag, Space, Badge, Dropdown, Menu } from "antd"
import { DownOutlined } from "@ant-design/icons"
// import envSwitch from "@SRC/utils/ENVCONFIG"
import { stockIndicator, CaculateTypeItems } from "@SRC/utils/utilFuncs"
import "@PAGE/pages.css"

const menu = (
  <Menu>
    <Menu.Item>Add Item</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
)

const SelectedListModule = ({ values }: any) => {
  // define when mouse over the row

  const columns = [
    // inner row columns
    { title: "SKU", dataIndex: "sku", key: "sku" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Size", dataIndex: "size", key: "size" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "In Stock",
      key: "inStock",
      dataIndex: "inStock",
      render: (a: any, b: any, c: any) => {
        // a: current row value, b: current column value(a obj), c: row index

        return (
          <span>
            <Badge status={stockIndicator(a)} />
            {a}
          </span>
        )
      },
    },
    { title: "PCPrice", dataIndex: "pcPrice", key: "pcPrice" },
    { title: "Installation", dataIndex: "installPrice", key: "installPrice" },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: () => (
        <Space size="middle">
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
  if (values === undefined) {
    values = []
  }
  for (let i = 0; i < values.length; i++) {
    data.push({
      key: values[i].id,
      sku: values[i].sku,
      name: values[i].name,
      price: values[i].price,
      size: values[i].size,
      pcPrice: values[i].powdercoatingprice,
      installPrice: values[i].installationprice,
      inStock: values[i].currentInStock,
      lastUpdate: values[i].lastUpdate,
    })
  }

  return (
    <Table
      onRow={(record) => {
        return {
          onClick: (event) => {}, // 点击行
          onDoubleClick: (event) => {},
          onContextMenu: (event) => {},
          onMouseEnter: (event) => {}, // 鼠标移入行
          onMouseLeave: (event) => {},
        }
      }}
      columns={columns}
      dataSource={data}
      pagination={false}
      rowClassName={(record, index) => {
        if (index % 2 === 0) {
          return "warehousing-oddRow"
        } else return "warehousing-evenRow"
      }}
    />
  )
}

export default SelectedListModule
