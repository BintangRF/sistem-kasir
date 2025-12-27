import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import { Cashier } from "./pages/Cashier";
import Sidebar from "./sharedComponent/Sidebar";
import { Transaction } from "./pages/Transaction";
import { Item } from "./pages/Item";
import Login from "./pages/Login";
import { Category } from "./pages/Category";
import { useAuth } from "./hooks/useAuth";
import { TransactionGraph } from "./pages/TransactionGraph";

const { Content, Sider } = Layout;

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isLogin = localStorage.getItem("isLogin") === "true";

  if (!isLogin) return <Navigate to="/login" />;

  const { profileData, isProfileLoading, isProfileError } = useAuth({
    enabled: isLogin,
  });

  if (isProfileLoading) return null;

  if (isProfileError || !profileData || !isLogin)
    return <Navigate to="/login" />;

  return element;
};

function App() {
  const location = useLocation();

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
                <Route path="/login" element={<Login />} />
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
                <Route
                  path="/transaction-graph"
                  element={<PrivateRoute element={<TransactionGraph />} />}
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
