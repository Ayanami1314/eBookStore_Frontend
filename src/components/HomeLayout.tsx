import { Breadcrumb, Layout, Menu, theme } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { Link, Outlet, useLocation } from "react-router-dom";
import UserIcon from "./UserIcon";
import useAuthStore from "../auth/useAuthStore";

const { Header, Content, Footer } = Layout;
interface NavItem {
  description: string;
  link: string;
}
const navItems: NavItem[] = [
  { description: "主页", link: "/" },
  { description: "购物车", link: "/cart" },
  { description: "订单", link: "/bills" },
  { description: "统计数据", link: "/analysis" },
];
const adminNavItems: NavItem[] = [
  { description: "用户管理", link: "/admin/users" },
  { description: "书籍管理", link: "/admin/items" },
  { description: "订单管理", link: "/admin/bills" },
  { description: "统计管理数据", link: "/admin/analysis" },
];
const loginItem: NavItem = { description: "登录", link: "/login" };

const HomeLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const pathArray = location.pathname.split("/").filter(Boolean);
  // const menuItems = navItems.map((item, index) => ({
  //   key: index + 1,
  //   label: <Link to={item.link}>{item.description} </Link>,
  // }));
  const menuItems = navItems.map((item, index) => (
    <MenuItem key={index}>
      <Link to={item.link}>{item.description} </Link>
    </MenuItem>
  ));
  const adminMenuItems = adminNavItems.map((item, index) => (
    <MenuItem key={index}>
      <Link to={item.link}>{item.description} </Link>
    </MenuItem>
  ));
  // 48px: 和content对齐
  const { isAdmin, isUser } = useAuthStore((s) => s.authinfo);
  const loginMenuItem = (
    <MenuItem
      key={menuItems.length + 1}
      style={{ position: "absolute", right: 0, marginRight: "48px" }}
    >
      <Link to={loginItem.link}>{loginItem.description}</Link>
    </MenuItem>
  );
  const UserIconMenuItem = (
    <MenuItem
      key={menuItems.length + 2}
      style={{ position: "absolute", right: 0, marginRight: "48px" }}
    >
      <UserIcon></UserIcon>
    </MenuItem>
  );
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          style={{ flex: 1, minWidth: 0 }}
          // items={menuItems} 由于要使得登录在右边，所以不能用items，会覆盖掉children
        >
          {isAdmin ? adminMenuItems : menuItems}
          {isUser ? UserIconMenuItem : loginMenuItem}
        </Menu>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={pathArray.map((item, index) => ({ key: index, title: item }))}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default HomeLayout;
