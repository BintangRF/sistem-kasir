import React, { useEffect, useMemo } from "react";
import { Tabs, List, Typography, Space, Spin, Card } from "antd";
import { useItems } from "../hooks/useItems";
import { formatNumber } from "../utils/formatNumber";
import { useCashier } from "../context/CashierContext";

const { Text, Title } = Typography;

export const ItemList: React.FC = () => {
  const { handleSelectItem } = useCashier();
  const { itemsData, isLoading } = useItems();

  const groupedItems = useMemo(() => {
    return Object.values(itemsData).reduce((acc: any, item: any) => {
      if (!acc[item.category.name]) {
        acc[item.category.name] = [];
      }
      acc[item.category.name].push(item);
      return acc;
    }, {});
  }, [itemsData]);

  const tabItems = useMemo(() => {
    return Object.keys(groupedItems).map((category) => ({
      key: category,
      label: (
        <Title level={4} style={{ margin: 0 }}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Title>
      ),
      children: (
        <div
          style={{
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
            padding: "0px 10px 0px 10px",
          }}
        >
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={groupedItems[category]}
            renderItem={(item: any) => (
              <List.Item>
                <Card hoverable bordered onClick={() => handleSelectItem(item)}>
                  <Space direction="vertical">
                    <Text strong>{item.name}</Text>
                    <Text type="secondary">{formatNumber(item.price)} IDR</Text>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        </div>
      ),
    }));
  }, [groupedItems, handleSelectItem]);

  return (
    <div style={{ padding: 20, height: "100vh" }}>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Tabs defaultActiveKey="1" items={tabItems} />
      )}
    </div>
  );
};
