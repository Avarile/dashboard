import React from "react"
import "antd/dist/antd.css"
import { Table, Badge, Menu, Dropdown, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { stockIndicator, CaculateTypeItems } from "@SRC/utils/utilFuncs"
import Request from "@DATA/api.controller"
import envSwitch from "@SRC/utils/ENVCONFIG"
import { useNavigate } from "react-router-dom"
import SearchBar from "@SRC/components/SearchBar"
import QueriedTable from "@SRC/components/warehousing/QueriedTable"
import "./pages.css"
import { productTypes } from "@SRC/utils/productTypes"

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
  const navigate = useNavigate()

  // UI controller
  const [loadingStatus, setLoadingStatus] = React.useState(false)
  const [hoverEvent, setHoverEvent] = React.useState(false)

  /**
   * Rows been expanded definition
   *
   */
  const ExpandedRowRender = ({ values }: any) => {
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
        // size="small"
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
          if (index % 2 === 0) {
            return "warehousing-oddRow"
          } else return "warehousing-evenRow"
        }}
      />
    )
  }

  const columns = [
    { title: "Type", dataIndex: "type", key: "type", render: (a: any) => <h4>{a}</h4> },
    { title: "Items", dataIndex: "items", key: "items" },
    {
      title: "Action",
      key: "operation",
      render: () => (
        <a
          onClick={() => {
            navigate("/mainentrance/warehousing/instock")
            setLoadingStatus(false)
          }}>
          Edit Stock
        </a>
      ),
    },
  ]

  // Data init: Type and items caculation
  const env = envSwitch("dev")
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

  React.useEffect(() => {
    getProduct()
  }, [])
  // end of DATA init

  const data = []
  for (let i = 0; i < productTypes.length; ++i) {
    data.push({
      key: i,
      type: productTypes[i].name,
      items: CaculateTypeItems(productTypes[i].name, products),
    })
  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      {SearchBar({ placeHolder: "Please input sku", style: { minWidth: "15rem", maxWidth: "20rem", marginBottom: "5rem", alignSelf: "flex-end", marginRight: "8rem" } })}
      <QueriedTable />
      <>
        <h3>Cataglorised Display</h3>
        <Table
          // size="small"
          // tableRef={(tableInstance: any) => {
          //   tableRef.current = tableInstance;
          // }}
          className="components-table-demo-nested"
          columns={columns} // this is pretty straight forward this is cloumns
          expandable={{
            expandedRowRender: (record) => {
              let values: any[] = []
              products.map((product: any) => {
                if (product.type === record.type) {
                  values.push(product)
                } else return null
              })
              // IMPORTANT!!! the temp will be like this: [null, null, product1, null, product2 ...] and you cannot pass the nulls on to downstires

              return <ExpandedRowRender values={values} />
            },
          }} // and this is the expanderable Row
          dataSource={data} // dataSourse
          bordered={false}
        />
      </>
    </div>
  )
}

export default WareHousingMel
