import React from "react";
import { ReusableTable } from "../sharedComponent/ReusableTable";
import { useTransactions } from "../hooks/useTransactions";
import { formatNumber } from "../utils/formatNumber";
import {
  IItemTransactionTableProps,
  ITransactionTableProps,
} from "../interface/interfaces";

export const Transaction: React.FC = () => {
  const { transactionsData, isLoading } = useTransactions();

  const list = Array.isArray(transactionsData) ? transactionsData : [];

  const uniqueItems = Array.from(
    new Set(
      list.flatMap((transaction: ITransactionTableProps) =>
        transaction.items?.map(
          (subItem: IItemTransactionTableProps) => subItem.name
        )
      )
    )
  );

  const columns = [
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
      sorter: (a: ITransactionTableProps, b: ITransactionTableProps) =>
        a.buyerName.localeCompare(b.buyerName),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (amount: number) => formatNumber(amount) + " IDR",
      sorter: (a: ITransactionTableProps, b: ITransactionTableProps) =>
        a.totalAmount - b.totalAmount,
    },
    {
      title: "Items",
      dataIndex: "items",
      filterType: "select",
      filterOptions: uniqueItems.map((item) => ({ label: item, value: item })),
      multiSelect: true,
      render: (items: IItemTransactionTableProps[]) => (
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
      sorter: (a: ITransactionTableProps, b: ITransactionTableProps) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime(),
    },
  ];

  if (isLoading) return <p>Loading...</p>;

  // Transform transactionData to an array
  const dataSource: ITransactionTableProps[] = Object.values(transactionsData);

  return (
    <div>
      <h2>Data Transaksi</h2>
      <ReusableTable data={dataSource} columns={columns} showExport />;
    </div>
  );
};
