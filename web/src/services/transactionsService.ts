// transactionsService.ts
import { ITransactionsFormInputs } from "../hooks/useTransactions";

import { axiosInstance } from "../utils/axiosInstance";

export const transactionsService = {
  fetch: () =>
    axiosInstance.get("/api/transactions").then((res) => res.data.data),

  create: (payload: ITransactionsFormInputs) =>
    axiosInstance
      .post("/api/transactions/create", payload)
      .then((res) => res.data),
};
