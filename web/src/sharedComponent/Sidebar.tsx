import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  OrderedListOutlined,
  LogoutOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { NotifAlert } from "./NotifAlert";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth({
    onSuccess: () => {
      navigate("/login");
      localStorage.removeItem("isLogin");
    },
    onError: (err) => {
      console.error(err);
      const msg = err?.response?.data?.message ?? "Error";

      NotifAlert({
        type: "error",
        message: msg,
      });
    },
  });

  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Transactions</Link>,
    },
    {
      key: "/items",
      icon: <AppstoreOutlined />,
      label: <Link to="/items">Products</Link>,
    },
    {
      key: "/category",
      icon: <OrderedListOutlined />,
      label: <Link to="/category">Category</Link>,
    },
    {
      key: "/cashier",
      icon: <UserOutlined />,
      label: <Link to="/cashier">Cashier</Link>,
    },
    {
      key: "/transaction-graph",
      icon: <BarChartOutlined />,
      label: <Link to="/transaction-graph">Transaction Graph</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === "logout") {
      logout();
    }
  };

  return (
    <Sider
      width={200}
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
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ height: "100vh", borderRight: 0, padding: "0 10px" }}
      />
    </Sider>
  );
};

export default Sidebar;
