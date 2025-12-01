// categoriesService.ts
import { ApiResponse, ICategoryPayloadProps } from "../interface/interfaces";
import { axiosInstance } from "../utils/axiosInstance";

export const categoriesService = {
  fetch: () =>
    axiosInstance
      .get<ApiResponse<ICategoryPayloadProps[]>>("/api/categories")
      .then((res) => res.data),

  create: (payload: ICategoryPayloadProps) =>
    axiosInstance
      .post("/api/categories/create", payload)
      .then((res) => res.data),

  update: (payload: ICategoryPayloadProps) =>
    axiosInstance
      .put(`/api/categories/update/${payload.id}`, payload)
      .then((res) => res.data),

  delete: (id: string) =>
    axiosInstance
      .delete(`/api/categories/delete/${id}`)
      .then((res) => res.data),
};
