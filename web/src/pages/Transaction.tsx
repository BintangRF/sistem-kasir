import React from "react";
import { ReusableTable } from "../sharedComponent/ReusableTable";
import { useTransactions } from "../hooks/useTransactions";
import { formatNumber } from "../utils/formatNumber";

interface Item {
  name: string;
  quantity: number;
  id: string;
}

interface Transaction {
  buyerName: string;
  totalAmount: number;
  transactionDate: Date;
  items: Item[];
}

export const Transaction: React.FC = () => {
  const { transactionData, isLoading } = useTransactions();

  const uniqueItems = Array.from(
    new Set(
      transactionData.flatMap((transaction: Transaction) =>
        transaction.items?.map((subItem: Item) => subItem.name)
      )
    )
  );

  const columns = [
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
      sorter: (a: Transaction, b: Transaction) =>
        a.buyerName.localeCompare(b.buyerName),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (amount: number) => formatNumber(amount) + " IDR",
      sorter: (a: Transaction, b: Transaction) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Items",
      dataIndex: "items",
      filterType: "select",
      filterOptions: uniqueItems.map((item) => ({ label: item, value: item })),
      multiSelect: true,
      render: (items: Item[]) => (
        <div>
          {items.map((item) => (
            <div key={item.id}>
              {item.name} (x{item.quantity})
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      filterType: "date",
      render: (text: string) => new Date(text).toLocaleString(),
      sorter: (a: Transaction, b: Transaction) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime(),
    },
  ];

  if (isLoading) return <p>Loading...</p>;

  // Transform transactionData to an array
  const dataSource: Transaction[] = Object.values(transactionData);

  return (
    <div>
      <h2>Data Transaksi</h2>
      <ReusableTable data={dataSource} columns={columns} showExport />;
    </div>
  );
};
