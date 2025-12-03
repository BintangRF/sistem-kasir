// categoriesService.ts
import { ICategoriesFormInputs } from "../hooks/useCategories";
import { axiosInstance } from "../utils/axiosInstance";

export const categoriesService = {
  fetch: () =>
    axiosInstance.get("/api/categories").then((res) => res.data.data),

  create: (payload: ICategoriesFormInputs) =>
    axiosInstance
      .post("/api/categories/create", payload)
      .then((res) => res.data),

  update: (payload: ICategoriesFormInputs) =>
    axiosInstance
      .put(`/api/categories/update/${payload.id}`, payload)
      .then((res) => res.data),

  delete: (id: number) =>
    axiosInstance
      .delete(`/api/categories/delete/${id}`)
      .then((res) => res.data),
};
