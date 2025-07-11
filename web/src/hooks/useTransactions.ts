import axios from "axios";
import React, { useEffect, useState } from "react";
import { NotifAlert } from "../sharedComponent/NotifAlert";

interface ITransactionDataProps {
  buyerName: string;
  amountReceived: number;
  items: Array<any>;
  totalAmount: number;
  change: number;
  transactionDate: Date;
}

interface ApiResponse<T> {
  [x: string]: any;
  data: T;
  message?: string;
}

export const API_URL = import.meta.env.VITE_API_URL;

export const useTransactions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState("");
  const [transactionData, setTransactionData] = useState<
    ITransactionDataProps[]
  >([]);

  const handleApiCall = async <T>(
    apiCall: () => Promise<ApiResponse<T>>,
    onSuccess: (data: T) => void,
    onError: (message: string) => void
  ) => {
    setIsLoading(true);
    try {
      const response = await apiCall();
      onSuccess(response.data);
      setErrorState("");
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred";
      setErrorState(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactions = async () => {
    handleApiCall(
      () => axios.get(`${API_URL}/api/transactions`),
      (data) => setTransactionData(data),
      (message) => console.error(message)
    );
  };

  const handleCashTransaction = async (
    transactionData: ITransactionDataProps,
    onPaymentSuccess: () => void
  ) => {
    handleApiCall(
      () =>
        axios.post<ApiResponse<ITransactionDataProps>>(
          `${API_URL}/api/transactions`,
          transactionData
        ),
      (data) => {
        NotifAlert({
          type: "success",
          message: "Pembayaran tunai berhasil.",
        });
        onPaymentSuccess();
        return data;
      },
      (message) => {
        NotifAlert({
          type: "error",
          message,
        });
      }
    );
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return {
    getTransactions,
    handleCashTransaction,
    isLoading,
    errorState,
    transactionData,
  };
};
