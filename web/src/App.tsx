import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import "./App.css";
import { Cashier } from "./pages/Cashier";
import Sidebar from "./sharedComponent/Sidebar";
import { Transaction } from "./pages/Transaction";
import { Item } from "./pages/Item";
import Login from "./pages/Login";
import { Category } from "./pages/Category";

const { Content, Sider } = Layout;

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();

  const setToken = (token: string | null) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <Layout>
      {location.pathname !== "/login" && (
        <Sider width={200}>
          <Sidebar />
        </Sider>
      )}
      <Layout>
        <Content style={{ margin: 0, minHeight: "100vh" }}>
          <Row>
            <Col
              span={24}
              style={{ paddingRight: "2rem", paddingLeft: "2rem" }}
            >
              <Routes>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route
                  path="/"
                  element={<PrivateRoute element={<Transaction />} />}
                />
                <Route
                  path="/items"
                  element={<PrivateRoute element={<Item />} />}
                />
                <Route
                  path="/category"
                  element={<PrivateRoute element={<Category />} />}
                />
                <Route
                  path="/cashier"
                  element={<PrivateRoute element={<Cashier />} />}
                />
              </Routes>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
