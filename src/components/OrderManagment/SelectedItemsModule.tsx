import React from "react"
import "antd/dist/antd.css"
import { Table, Space, Badge, Menu, Button } from "antd"
import { DownOutlined } from "@ant-design/icons"
// import envSwitch from "@SRC/utils/ENVCONFIG"
import { stockIndicator, CaculateTypeItems } from "@SRC/utils/utilFuncs"
import "@PAGE/pages.css"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedItems, selectOrder, setPrice } from "@DATA/dataSlices/order.slice"

const menu = (
  <Menu>
    <Menu.Item>Delete Item</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
)

const SelectedListModule = () => {
  let selectedItems = useSelector(selectOrder).selectedItems
  let orderPrices = useSelector(selectOrder).orderPrices
  const dispatch = useDispatch()

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
    {
      title: "Installation", dataIndex: "installPrice", key: "installPrice"
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: (allData: any, currentRecord: any, index: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              let temp = [...selectedItems]
              debugger
              temp.splice(index, 1)
              dispatch(setSelectedItems(temp))
            }}>
            Deleted Item
          </a>
        </Space>
      ),
    },
  ]

  const data: any[] = []
  if (selectedItems === undefined) {
    selectedItems = []
  }
  for (let i = 0; i < selectedItems.length; i++) {
    data.push({
      key: selectedItems[i].id,
      sku: selectedItems[i].sku,
      name: selectedItems[i].name,
      price: selectedItems[i].price,
      size: selectedItems[i].size,
      pcPrice: selectedItems[i].pcPrice,
      installPrice: selectedItems[i].installPrice,
      inStock: selectedItems[i].inStock,
      lastUpdate: selectedItems[i].lastUpdate,
    })
  }

  let totalPCPrice = 0,
    totalInstallationPrice = 0,
    totalLogisticCost = 0,
    totalItemPrice = 0
  for (let item of data) {
    totalPCPrice += item.pcPrice
    totalInstallationPrice += item.installPrice
    totalItemPrice += item.price
  }

  return (
    <>
      <div style={{ marginTop: "5rem", marginBottom: "5rem" }}>
        <h4>Selected Items</h4>
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
      </div>

      <div>
        <p>Total PC: {totalPCPrice}</p>
        <p>Total Install: {totalInstallationPrice}</p>
        <p>Total Item Price: {totalItemPrice}</p>
        <p>Total Amount: {totalItemPrice + totalInstallationPrice + totalPCPrice}</p>
      </div>
      <Button>Submit Order</Button>
    </>
  )
}

export default SelectedListModule
