import React from "react";
import { Layout, Menu, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  OrderedListOutlined,
  LogoutOutlined,
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
    onError: (_, err) => {
      NotifAlert({
        type: "error",
        message: err.message ?? "Logout error",
      });
    },
  });

  const location = useLocation();

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

    // Tambahkan ini
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <Button
          type="text"
          danger
          style={{
            padding: "0 0",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
          onClick={() => logout()}
        >
          Logout
        </Button>
      ),
    },
  ];

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
        selectedKeys={getSelectedKeys()}
        items={menuItems}
        style={{ height: "100vh", borderRight: 0, padding: "0 10px 0 10px" }}
      />
    </Sider>
  );
};

export default Sidebar;
