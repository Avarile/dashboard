import React from "react"
import "antd/dist/antd.css"
import { Table, Badge, Menu, Dropdown, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { stockIndicator, CaculateTypeItems } from "@SRC/utils/utilFuncs"
import { selectProducts } from "@SRC/data/dataSlices/products.slice"
import { useSelector } from "react-redux"

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
1
const QueriedTable = () => {
  // Data Source:
  const values = useSelector(selectProducts)
  // UI controller
  const [hoverEvent, setHoverEvent] = React.useState(false)

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

  // process the values variable make it easier to use
  let data: any[] = []
  if (values.products.products[0]) {
    let temp = values.products.products[0]
    data.push({
      key: temp?.id,
      sku: temp?.sku,
      name: temp?.name,
      price: temp?.price,
      size: temp?.size,
      pcPrice: temp?.powdercoatingprice,
      installPrice: temp?.installationprice,
      inStock: temp?.currentInStock,
      lastUpdate: temp?.lastUpdate,
    })
  } else {
    return null
  }

  return (
    <>
      <h3>Queried Display</h3>
      <Table
        loading={values.isloading.isloading}
        style={{ marginBottom: "4rem" }}
        onRow={(record) => {
          return {
            onClick: (event) => {}, // 点击行
            onDoubleClick: (event) => {},
            onContextMenu: (event) => {},
            onMouseEnter: (event) => {
              setHoverEvent(true)
            }, // 鼠标移入行
            onMouseLeave: (event) => {
              setHoverEvent(false)
            },
          }
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record, index) => {
          if (index / 2 === 0) {
            return "oddRow"
          } else return "evenRow"
        }}
      />
    </>
  )
}

export default QueriedTable
