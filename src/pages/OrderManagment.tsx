import React from "react"
import "antd/dist/antd.css"
import { Tabs } from "antd"
import { FileOutlined, FileProtectOutlined, FileExcelOutlined } from "@ant-design/icons"
import OrderCreationComponent from "@SRC/components/OrderManagment/CreateOrderForm"
import { StyledTabPane } from "@SRC/components/styledComponents/TabSpan"

const OrderManagment = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" animated style={{ marginLeft: "-20px", width: "100%" }}>
        <StyledTabPane
          tab={
            <span style={{ width: "100%", height: "100" }}>
              <FileOutlined />
              Create Order
            </span>
          }
          key="1">
          <OrderCreationComponent />
        </StyledTabPane>
        <StyledTabPane
          tab={
            <span>
              <FileProtectOutlined />
              Edit Order
            </span>
          }
          key="2">
          Contents of Tab 2
        </StyledTabPane>
        <StyledTabPane
          tab={
            <span>
              <FileExcelOutlined />
              Delete Order
            </span>
          }
          key="3">
          Delete Order
        </StyledTabPane>
      </Tabs>
    </>
  )
}

export default OrderManagment
