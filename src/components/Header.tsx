import React from "react";
import { Avatar, Layout, Space, Tooltip } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Header({ uiController, setUiController, logout, toggle }: any) {
  const { Header } = Layout;
  return (
    <Header className="site-layout-background">
      <Space>
        {React.createElement(uiController.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: "trigger",
          onClick: toggle,
        })}
        <div style={{ marginLeft: "80rem" }}>
          <Tooltip title="Avarile" placement="left">
            <Avatar src="https://joeschmoe.io/api/v1/random" size="small" />
          </Tooltip>
          <Button
            style={{ marginLeft: "1rem" }}
            loading={uiController.loading}
            disabled={uiController.loading}
            onClick={() => {
              logout();
            }}>
            Logout
          </Button>
        </div>
      </Space>
    </Header>
  );
}
