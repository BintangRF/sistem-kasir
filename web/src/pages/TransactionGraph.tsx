import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Card } from "antd";
import { useTransactions } from "../hooks/useTransactions";
import {
  IItemTransactionsProps,
  ITransactionResponseProps,
} from "../interface/interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const TransactionGraph: React.FC = () => {
  const { transactionsData, isLoading } = useTransactions();

  // --- Data untuk Bar Chart ---
  const itemsCount = transactionsData.flatMap(
    (tx: ITransactionResponseProps) => tx.items || []
  );

  const itemMap: Record<string, number> = {};
  itemsCount.forEach((item: IItemTransactionsProps) => {
    itemMap[item.name] = (itemMap[item.name] || 0) + item.quantity;
  });

  const barData = {
    labels: Object.keys(itemMap),
    datasets: [
      {
        label: "Jumlah Terjual",
        data: Object.values(itemMap),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  // --- Data untuk Line Chart ---
  const dateMap: Record<string, number> = {};

  transactionsData.forEach((tx: ITransactionResponseProps) => {
    const date = new Date(tx.transactionDate).toISOString().split("T")[0];
    dateMap[date] = (dateMap[date] || 0) + tx.totalAmount;
  });

  const lineData = {
    labels: Object.keys(dateMap),
    datasets: [
      {
        label: "Total Pendapatan (IDR)",
        data: Object.values(dateMap),
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: true,
      },
    ],
  };

  // --- Data untuk Pie Chart ---
  const paymentMap: Record<string, number> = {};

  transactionsData.forEach((tx: ITransactionResponseProps) => {
    paymentMap[tx.buyerName] =
      (paymentMap[tx.buyerName] || 0) + tx.amountReceived;
  });

  const pieData = {
    labels: Object.keys(paymentMap),
    datasets: [
      {
        data: Object.values(paymentMap),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Transaction Dashboard</h1>

      <Card style={{ marginBottom: "2rem" }}>
        <h2>Jumlah Terjual per Item</h2>
        <Bar data={barData} />
      </Card>

      <Card style={{ marginBottom: "2rem" }}>
        <h2>Total Pendapatan per Tanggal</h2>
        <Line data={lineData} />
      </Card>

      <Card style={{ marginBottom: "2rem" }}>
        <h2>Distribusi Pembayaran per Pembeli</h2>
        <Pie data={pieData} />
      </Card>
    </div>
  );
};
