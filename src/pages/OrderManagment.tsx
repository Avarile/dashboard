import React from "react"
import "antd/dist/antd.css"
import { Tabs } from "antd"
import { FileOutlined, FileProtectOutlined, FileExcelOutlined } from "@ant-design/icons"
import OrderCreationComponent from "@SRC/components/OrderManagment/CreateOrderForm"
import { StyledTabPane } from "@SRC/components/styledComponents/TabSpan"
import Temp from "@SRC/components/OrderManagment/CreateQuoteForm"

const OrderManagment = () => {
  return (
    <>
      <Tabs defaultActiveKey="1" animated style={{ marginLeft: "20px", width: "100%" }}>
        <StyledTabPane
          tab={
            <span style={{ height: "100%" }}>
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
          <Temp />
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
