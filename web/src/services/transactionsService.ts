// transactionsService.ts
import {
  ApiResponse,
  ITransactionPayloadProps,
  ITransactionTableProps,
} from "../interface/interfaces";
import { axiosInstance } from "../utils/axiosInstance";

export const transactionsService = {
  fetch: () =>
    axiosInstance
      .get<ApiResponse<ITransactionTableProps[]>>("/api/transactions")
      .then((res) => res.data),

  create: (payload: ITransactionPayloadProps) =>
    axiosInstance
      .post("/api/transactions/create", payload)
      .then((res) => res.data),
};
