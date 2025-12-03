import React from "react";
import { ReusableTable } from "../sharedComponent/ReusableTable";
import { useTransactions } from "../hooks/useTransactions";
import { formatNumber } from "../utils/formatNumber";
import {
  IItemTransactionsProps,
  ITransactionResponseProps,
} from "../interface/interfaces";
import { formatDate } from "../utils/formatDate";

export const Transaction: React.FC = () => {
  const { transactionsData, isLoading } = useTransactions();

  const list = Array.isArray(transactionsData) ? transactionsData : [];

  const uniqueItems = Array.from(
    new Set(
      list.flatMap((transaction: ITransactionResponseProps) =>
        transaction.items?.map(
          (subItem: IItemTransactionsProps) => subItem.name
        )
      )
    )
  );

  console.log(transactionsData);

  const columns = [
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
      sorter: (a: ITransactionResponseProps, b: ITransactionResponseProps) =>
        a.buyerName.localeCompare(b.buyerName),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      render: (amount: number) => formatNumber(amount) + " IDR",
      sorter: (a: ITransactionResponseProps, b: ITransactionResponseProps) =>
        a.totalAmount - b.totalAmount,
    },
    {
      title: "Amount Received",
      dataIndex: "amountReceived",
      render: (amount: number) => formatNumber(amount) + " IDR",
      sorter: (a: ITransactionResponseProps, b: ITransactionResponseProps) =>
        a.amountReceived - b.amountReceived,
    },
    {
      title: "Items",
      dataIndex: "items",
      filterType: "select",
      filterOptions: uniqueItems.map((item) => ({ label: item, value: item })),
      multiSelect: true,
      render: (items: IItemTransactionsProps[]) => (
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
      render: (text: string) => formatDate(text),
      sorter: (a: ITransactionResponseProps, b: ITransactionResponseProps) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime(),
    },
  ];

  if (isLoading) return <p>Loading...</p>;

  // Transform transactionData to an array
  const dataSource: ITransactionResponseProps[] =
    Object.values(transactionsData);

  return (
    <div>
      <h2>Data Transaksi</h2>
      <ReusableTable data={dataSource} columns={columns} showExport />;
    </div>
  );
};
