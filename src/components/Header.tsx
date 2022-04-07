import React from "react"
import { Layout } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Button } from "antd"

export default function Header({ uiController, setUiController, logout, toggle }: any) {
  const { Header } = Layout
  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(uiController.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: toggle,
      })}

      <Button
        loading={uiController.loading}
        disabled={uiController.loading}
        onClick={() => {
          logout()
        }}>
        Logout
      </Button>
    </Header>
  )
}
