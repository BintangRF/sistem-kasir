// itemService.ts
import { IItemsFormInputs } from "../hooks/useItems";
import { axiosInstance } from "../utils/axiosInstance";

export const itemService = {
  fetch: () => axiosInstance.get("/api/items").then((res) => res.data.data),

  create: (payload: IItemsFormInputs) =>
    axiosInstance.post("/api/items/create", payload).then((res) => res.data),

  update: (payload: IItemsFormInputs) =>
    axiosInstance
      .put(`/api/items/update/${payload.id}`, payload)
      .then((res) => res.data),

  delete: (id: number) =>
    axiosInstance.delete(`/api/items/delete/${id}`).then((res) => res.data),
};
