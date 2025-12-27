import { api } from "../lib/api";
import { ITransactionsFormInputs } from "../hooks/useTransactions";
import {
  ApiResponse,
  ITransactionResponseProps,
} from "../interface/interfaces";

export const transactionsService = {
  fetch: () => api.get<ITransactionResponseProps[]>("/api/transactions"),

  create: (payload: ITransactionsFormInputs) =>
    api.post<ApiResponse<ITransactionsFormInputs>, ITransactionsFormInputs>(
      "/api/transactions/create",
      payload
    ),
};
