import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";
import z from "zod";
import { ApiResponse, ErrorResponse } from "../interface/interfaces";

// Schema
export const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().nonnegative().optional(),
});

export const transactionsSchema = z
  .object({
    buyerName: z.string().nonempty("Name required"),
    amountReceived: z.number(),
    totalAmount: z.number(),
    change: z.number().optional(),
  })
  .refine((v) => v.amountReceived >= v.totalAmount, {
    message:
      "The amount of money not received may be less than the total payment.",
    path: ["amountReceived"],
  });

export type ITransactionsFormInputs = z.infer<typeof transactionsSchema>;
export type ICashierItemList = z.infer<typeof itemSchema>;

type SuccessPayload = ApiResponse<ITransactionsFormInputs> | ApiResponse<null>;

export const useTransactions = (opts?: {
  onSuccess?: (res?: SuccessPayload) => void;
  onError?: (err: ErrorResponse) => void;
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

  const createTransaction = useMutation<
    SuccessPayload,
    ErrorResponse,
    ITransactionsFormInputs
  >({
    mutationFn: transactionsService.create,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["transactions"] });
      opts?.onSuccess?.(res);
    },
    onError: (err) => {
      opts?.onError?.(err);
    },
  });

  return {
    transactionsData,
    isLoading,
    error,

    createTransaction: createTransaction.mutate,
    isLoadingMutate: createTransaction.isPending,
  };
};
