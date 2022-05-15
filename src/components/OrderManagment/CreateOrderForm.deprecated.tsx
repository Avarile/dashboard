import React from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { FileOutlined, FileProtectOutlined, FileExcelOutlined } from "@ant-design/icons";
import { StyledTabPane } from "../styledComponents/TabSpan";
import CreateNewQuotation from "./CreateQuoteForm";
import OrderListModule from "./OrderListModule";

const OrderCreationComponent = () => {
  return (
    <>
      <div style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px", height: "100%" }}>
        <Tabs defaultActiveKey="1" animated style={{ backgroundColor: "#fef2f2", height: "100%" }}>
          <StyledTabPane
            tab={
              <span>
                <FileOutlined />
                Create Quote
              </span>
            }
            key="1">
            <CreateNewQuotation />
          </StyledTabPane>
          <StyledTabPane
            tab={
              <span>
                <FileProtectOutlined />
                Create Invoice
              </span>
            }
            key="2">
            Contents of Tab 2
          </StyledTabPane>
          <StyledTabPane
            tab={
              <span>
                <FileExcelOutlined />
                Manage Order / Invoice
              </span>
            }
            key="3">
            <OrderListModule />
          </StyledTabPane>
        </Tabs>
      </div>
    </>
  );
};

export default OrderCreationComponent;
