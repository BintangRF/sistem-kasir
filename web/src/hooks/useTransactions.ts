import { z } from "zod";
import { transactionsService } from "../services/transactionsService";
import { ApiResponse } from "../interface/interfaces";
import { useGetQuery } from "./useQuery/useGetQuery";
import { useMutateQuery } from "./useQuery/useMutateQuery";

export const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().nonnegative().optional(),
});

export const transactionsSchema = z
  .object({
    buyerName: z.string().nonempty(),
    amountReceived: z.number(),
    totalAmount: z.number(),
    change: z.number().optional(),
  })
  .refine((v) => v.amountReceived >= v.totalAmount, {
    message: "Amount received must be greater or equal to total amount",
    path: ["amountReceived"],
  });

export type ITransactionsFormInputs = z.infer<typeof transactionsSchema>;
export type ICashierItemList = z.infer<typeof itemSchema>;

type SuccessPayload = ApiResponse<ITransactionsFormInputs> | ApiResponse<null>;

export const useTransactions = () => {
  const transactionsQuery = useGetQuery(
    ["transactions"],
    transactionsService.fetch
  );

  const createTransaction = useMutateQuery<
    SuccessPayload,
    ITransactionsFormInputs
  >(transactionsService.create, {
    invalidateKey: ["transactions"],
  });

  return {
    transactionsData: transactionsQuery.data ?? [],
    isLoading: transactionsQuery.isLoading,
    error: transactionsQuery.error,

    createTransaction: createTransaction.mutate,
    isLoadingMutate: createTransaction.isPending,
  };
};
