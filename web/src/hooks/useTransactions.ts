import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { NotifAlert } from "../sharedComponent/NotifAlert";
import { useCashier } from "../context/CashierContext";

export interface ITransactionDataProps {
  buyerName: string;
  amountReceived: number;
  items: Array<any>;
  totalAmount: number;
  transactionDate: Date;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

// --- API ---
const fetchTransactions = async () => {
  const res = await axiosInstance.get<ApiResponse<ITransactionDataProps[]>>(
    "/api/transactions"
  );
  return res.data;
};

const createTransaction = async (payload: ITransactionDataProps) => {
  const res = await axiosInstance.post<ApiResponse<ITransactionDataProps>>(
    "/api/transactions/create",
    payload
  );
  return res.data;
};

// --- Hook ---
export const useTransactions = () => {
  const qc = useQueryClient();

  // GET
  const {
    data: transactionData = [],
    isLoading,
    error,
    refetch: getTransactions,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });

  // POST
  const { mutate: handleCashTransaction, isPending } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      NotifAlert({
        type: "success",
        message: "Pembayaran tunai berhasil.",
      });

      qc.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err: any) => {
      NotifAlert({
        type: "error",
        message: err?.message ?? "An error occurred",
      });
    },
  });

  return {
    transactionData,
    isLoading: isLoading || isPending,
    errorState: error?.message ?? "",
    getTransactions,
    handleCashTransaction,
  };
};
