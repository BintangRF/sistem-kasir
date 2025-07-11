import { Button, List, Typography, Divider, Space, Card, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
import { useCashier } from "../../context/CashierContext";
import { formatNumber } from "../utils/formatNumber";

const { Text, Title } = Typography;

export const SelectedItems: React.FC = () => {
  const { selectedItems, handleSelectItem, handleRemoveItem, handleShowModal } =
    useCashier();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalAmount = formatNumber(
    selectedItems.reduce(
      (total, item) => total + item.price * item.quantity!,
      0
    )
  );

  const rowStyle: React.CSSProperties = {
    width: "100%",
    flexDirection: windowWidth < 1200 ? "column" : "row",
    alignItems: windowWidth < 1200 ? "start" : "center",
    justifyContent: "space-between",
  };

  return (
    <Card
      style={{
        border: "1px solid #ccc",
        borderRadius: "10px",
        height: "100vh",
      }}
    >
      <Title level={4} style={{ marginBottom: 20 }}>
        Selected Items
      </Title>
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #e8e8e8",
          borderRadius: "8px",
        }}
      >
        <List
          dataSource={selectedItems}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <Row justify={"space-between"} style={rowStyle}>
                <Col style={{ display: "flex", flexDirection: "column" }}>
                  <Text strong>{item.name}</Text>
                  <Text type="secondary">
                    {formatNumber(item.price)} IDR x {item.quantity}
                  </Text>
                </Col>
                <Col>
                  <Space>
                    <Button
                      size="small"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button size="small" onClick={() => handleSelectItem(item)}>
                      +
                    </Button>
                  </Space>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>

      <Divider />

      <Space direction="vertical" style={{ width: "100%" }}>
        <Title level={5}>Total: {totalAmount} IDR</Title>
        <Button
          type="primary"
          block
          onClick={handleShowModal}
          style={{ marginTop: "10px" }}
        >
          Lihat
        </Button>
      </Space>
    </Card>
  );
};
