import React from "react";
import { Row, Col } from "antd";
import { SelectedItems } from "../components/SelectedItems";
import { Payment } from "../components/Payment";
import { CashierProvider } from "../../context/CashierContext";
import { ItemList } from "../components/ItemList";

export const Cashier: React.FC = () => {
  return (
    <CashierProvider>
      <div>
        <Row gutter={16}>
          <Col span={16}>
            <ItemList />
          </Col>
          <Col span={8}>
            <SelectedItems />
          </Col>
        </Row>

        <Payment />
      </div>
    </CashierProvider>
  );
};
