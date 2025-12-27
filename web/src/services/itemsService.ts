import { api } from "../lib/api";
import { IItemsFormInputs } from "../hooks/useItems";
import { ApiResponse, IItemResponseProps } from "../interface/interfaces";

export const itemService = {
  fetch: () => api.get<IItemResponseProps[]>("/api/items"),

  create: (payload: IItemsFormInputs) =>
    api.post<ApiResponse<IItemsFormInputs>, IItemsFormInputs>(
      "/api/items/create",
      payload
    ),

  update: (payload: IItemsFormInputs) =>
    api.put<ApiResponse<IItemsFormInputs>, IItemsFormInputs>(
      `/api/items/update/${payload.id}`,
      payload
    ),

  delete: (id: number) =>
    api.delete<ApiResponse<null>>(`/api/items/delete/${id}`),
};
