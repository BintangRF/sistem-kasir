// itemService.ts
import { ApiResponse, IItemPayloadProps } from "../interface/interfaces";
import { axiosInstance } from "../utils/axiosInstance";

export const itemService = {
  fetch: () =>
    axiosInstance
      .get<ApiResponse<IItemPayloadProps[]>>("/api/items")
      .then((res) => res.data),

  create: (payload: IItemPayloadProps) =>
    axiosInstance.post("/api/items/create", payload).then((res) => res.data),

  update: (payload: IItemPayloadProps) =>
    axiosInstance
      .put(`/api/items/update/${payload.id}`, payload)
      .then((res) => res.data),

  delete: (id: string) =>
    axiosInstance.delete(`/api/items/delete/${id}`).then((res) => res.data),
};
