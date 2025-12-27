import { api } from "../lib/api";
import { ICategoriesFormInputs } from "../hooks/useCategories";
import { ApiResponse, ICategoriesResponseProps } from "../interface/interfaces";

export const categoriesService = {
  fetch: () => api.get<ICategoriesResponseProps[]>("/api/categories"),

  create: (payload: ICategoriesFormInputs) =>
    api.post<ApiResponse<ICategoriesFormInputs>, ICategoriesFormInputs>(
      "/api/categories/create",
      payload
    ),

  update: (payload: ICategoriesFormInputs) =>
    api.put<ApiResponse<ICategoriesFormInputs>, ICategoriesFormInputs>(
      `/api/categories/update/${payload.id}`,
      payload
    ),

  delete: (id: number) =>
    api.delete<ApiResponse<null>>(`/api/categories/delete/${id}`),
};
