import React, { ReactInstance, useState } from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { TabletOutlined, CrownOutlined } from "@ant-design/icons";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Header from "@SRC/components/Header";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

// Content
const originData: any = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `TB001-${i}`,
    price: "400",
    currentStock: `40`,
  });
}

const MainEntrance = () => {
  const navigate = useNavigate();

  const [uiController, setUiController] = useState({
    collapsed: false,
    loading: false,
  });

  const logout = () => {
    window.sessionStorage.clear();
    setUiController({
      ...uiController,
      loading: true,
    });
    setTimeout(() => {
      setUiController({
        ...uiController,
        loading: false,
      });

      navigate("/login");
    }, 3000);
  };

  const toggle = () => {
    setUiController({
      ...uiController,
      collapsed: !uiController.collapsed,
    });
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={uiController.collapsed}
        theme="light"
      >
        <div className="logo">
          {uiController.collapsed ? <h3>EZT</h3> : <h3>Easy Tool Box</h3>}
        </div>
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item
            key="1"
            icon={StyledCrownWrapper(CrownOutlined, { color: "red" })}
          >
            <Link
              to="/mainentrance/ordermanagment"
              style={{ textDecoration: "none" }}
            >
              订单管理
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={StyledCrownWrapper(CrownOutlined, { color: "blue" })}
            title="库存管理"
          >
            <Menu.Item key="2" icon={<TabletOutlined />}>
              <Link
                to="/mainentrance/warehousing/instock"
                style={{ textDecoration: "none" }}
              >
                入库
              </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<TabletOutlined />}>
              <Link
                to="/mainentrance/warehousing/melstock"
                style={{ textDecoration: "none" }}
              >
                当前库存(Mel)
              </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<TabletOutlined />}>
              <Link
                to="/mainentrance/warehousing/melstock"
                style={{ textDecoration: "none" }}
              >
                当前库存(Bri)
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub2"
            icon={StyledCrownWrapper(CrownOutlined, { color: "green" })}
            title="生产加工"
          >
            <Menu.Item key="5" icon={<TabletOutlined />}>
              <Link
                to="/mainentrance/fabrication/powdercoating"
                style={{ textDecoration: "none" }}
              >
                Powder Coating
              </Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<TabletOutlined />}>
              <Link
                to="/mainentrance/fabrication/workshop"
                style={{ textDecoration: "none" }}
              >
                WorkShop
              </Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<TabletOutlined />}>
              <Link
                to="/mainentrance/fabrication/customize"
                style={{ textDecoration: "none" }}
              >
                定制
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            icon={StyledCrownWrapper(CrownOutlined, { color: "brown" })}
            title="物流管理"
          >
            <Menu.Item key="8" icon={<TabletOutlined />}>
              <Link
                to="/mainentrance/fabrication/bigpost"
                style={{ textDecoration: "none" }}
              >
                Big Post
              </Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<TabletOutlined />}>
              <Link
                to="/mainentrance/fabrication/fastway"
                style={{ textDecoration: "none" }}
              >
                Fastway
              </Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<TabletOutlined />}>
              <Link
                to="/mainentrance/fabrication/post"
                style={{ textDecoration: "none" }}
              >
                Post
              </Link>
            </Menu.Item>
            <Menu.Item key="11" icon={<TabletOutlined />}>
              <Link
                to="/mainentrance/fabrication/general"
                style={{ textDecoration: "none" }}
              >
                general info
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="12"
            icon={StyledCrownWrapper(CrownOutlined, { color: "gold" })}
          >
            <Link
              to="/mainentrance/incomingcontainer"
              style={{ textDecoration: "none" }}
            >
              下个集装箱内容
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          logout={logout}
          toggle={toggle}
          uiController={uiController}
          setUiController={setUiController}
        />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px 24px 10px",
            padding: "24px 24px 24px 60px",
            minHeight: 280,
            display: "flex",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainEntrance;

const StyledCrownWrapper = (
  Child: React.ForwardRefExoticComponent<any>,
  Style: Object
) => {
  return <Child style={Style} />;
};

const Crown = StyledCrownWrapper(CrownOutlined, { color: "red" });
