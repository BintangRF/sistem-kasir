import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";

export const useTransactions = (opts?: {
  onSuccess?: (type: "create") => void;
  onError?: (type: "create", err: any) => void;
}) => {
  const qc = useQueryClient();

  const {
    data: transactionsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionsService.fetch,
  });

  const createTransaction = useMutation({
    mutationFn: transactionsService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      opts?.onSuccess?.("create");
    },
    onError: (err) => opts?.onError?.("create", err),
  });

  return {
    transactionsData,
    isLoading,
    error,

    createTransaction: createTransaction.mutate,
    errorMutate: createTransaction.isError,
    isLoadingMutate: createTransaction.isPending,
  };
};
