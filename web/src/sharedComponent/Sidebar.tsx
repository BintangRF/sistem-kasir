import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <Link to="/">Transactions</Link>,
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: <Link to="/items">Products</Link>,
  },
  {
    key: "3",
    icon: <OrderedListOutlined />,
    label: <Link to="/category">Category</Link>,
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: <Link to="/cashier">Cashier</Link>,
  },
];

const Sidebar = () => {
  const location = useLocation();

  const getSelectedKeys = () => {
    switch (location.pathname) {
      case "/":
        return ["1"];
      case "/items":
        return ["2"];
      case "/category":
        return ["3"];
      case "/cashier":
        return ["4"];
      default:
        return [];
    }
  };

  return (
    <Sider
      width={200}
      className="site-layout-background"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        zIndex: 100,
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={getSelectedKeys()}
        items={menuItems}
        style={{ height: "100vh", borderRight: 0, padding: "0 10px 0 10px" }}
      />
    </Sider>
  );
};

export default Sidebar;
