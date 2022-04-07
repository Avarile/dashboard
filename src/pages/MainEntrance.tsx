import React, { useState } from "react"
import "antd/dist/antd.css"
import { Layout, Menu, Button, Input } from "antd"
import { MenuUnfoldOutlined, TabletOutlined, PoweroffOutlined, CrownOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import Header from "@SRC/components/Header"

const { Sider, Content } = Layout
const { SubMenu } = Menu

// Content
const originData: any = []

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `TB001-${i}`,
    price: "400",
    currentStock: `40`,
  })
}

const MainEntrance = () => {
  const navigate = useNavigate()

  const [uiController, setUiController] = useState({
    collapsed: false,
    loading: false,
  })

  const logout = () => {
    window.sessionStorage.clear()
    setUiController({
      ...uiController,
      loading: true,
    })
    setTimeout(() => {
      setUiController({
        ...uiController,
        loading: false,
      })

      navigate("/login")
    }, 3000)
  }

  const toggle = () => {
    setUiController({
      ...uiController,
      collapsed: !uiController.collapsed,
    })
  }

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <Sider trigger={null} collapsible collapsed={uiController.collapsed} theme="light">
        <div className="logo">{uiController.collapsed ? <h3>EZT</h3> : <h3>Easy Tool Box</h3>}</div>
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<CrownOutlined />}>
            订单管理
          </Menu.Item>
          <SubMenu key="sub1" icon={<CrownOutlined />} title="库存管理">
            <Menu.Item key="2" icon={<TabletOutlined />}>
              入库
            </Menu.Item>
            <Menu.Item key="3" icon={<TabletOutlined />}>
              当前库存(Mel)
            </Menu.Item>
            <Menu.Item key="4" icon={<TabletOutlined />}>
              当前库存(Bri)
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<CrownOutlined />} title="生产加工">
            <Menu.Item key="5" icon={<TabletOutlined />}>
              Powder Coating
            </Menu.Item>
            <Menu.Item key="6" icon={<TabletOutlined />}>
              WorkShop
            </Menu.Item>
            <Menu.Item key="7" icon={<TabletOutlined />}>
              定制
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<CrownOutlined />} title="物流管理">
            <Menu.Item key="8" icon={<TabletOutlined />}>
              Big Post
            </Menu.Item>
            <Menu.Item key="9" icon={<TabletOutlined />}>
              Fastway
            </Menu.Item>
            <Menu.Item key="10" icon={<TabletOutlined />}>
              Post
            </Menu.Item>
            <Menu.Item key="11" icon={<TabletOutlined />}>
              其他
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="12" icon={<CrownOutlined />}>
            下个集装箱内容
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header logout={logout} toggle={toggle} uiController={uiController} setUiController={setUiController} />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}></Content>
      </Layout>
    </Layout>
  )
}

export default MainEntrance
