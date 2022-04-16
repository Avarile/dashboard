import React from "react"
import "antd/dist/antd.css"
import { Table, Badge, Menu, Dropdown, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { stockIndicator, CaculateTypeItems } from "@SRC/utils/utilFuncs"
import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"

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

function WareHousingMel() {
  // UI controller
  const [loadingStatus, setLoadingStatus] = React.useState(false)

  /**
   * Rows been expanded definition
   *
   */
  const expandedRowRender = () => {
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

    return <Table columns={columns} dataSource={data} pagination={false} />
  }

  const columns = [
    { title: "Type", dataIndex: "type", key: "type", render: (a: any) => <h4>{a}</h4> },
    { title: "Items", dataIndex: "items", key: "items" },
    { title: "Action", key: "operation", render: () => <a>Publish</a> },
  ]

  // Data init: Type and items caculation
  const env = envSwitch("dev")
  const [productTypes, setProductTypes] = React.useState<any>([])
  const [products, setProducts] = React.useState<any>([])

  const getProduct = async () => {
    return await Request.get(`${env.dbUri}/products`)
      .then((response: any) => {
        setProducts(response)
      })
      .catch((error: any) => {
        throw new Error("WareHousingMEl cannont get the Product data", error)
      })
  }

  const getProductType = async () => {
    await Request.get(`${env.dbUri}/productTypes`)
      .then((response: any) => {
        setProductTypes(response)
      })
      .catch((error: any) => {
        throw new Error("Cannot load the productTypes", error)
      })
  }

  React.useEffect(() => {
    getProductType()
    getProduct()
  }, [])
  // end of DATA init

  const data = []
  for (let i = 0; i < productTypes.length; ++i) {
    debugger
    data.push({
      key: i,
      type: productTypes[i].name.toUpperCase(),
      items: CaculateTypeItems(productTypes[i].name, products),
    })
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
        expandable={{
          expandedRowRender
        }} // and this is the expanderable Row
        dataSource={data} // dataSourse
        bordered={false}
      />
    </div>
  )
}

export default WareHousingMel
