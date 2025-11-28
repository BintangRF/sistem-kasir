import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { NotifAlert } from "../sharedComponent/NotifAlert";

export interface IItemProps {
  id: string;
  name: string;
  price: number;
  categoryId: number;
  category: {
    name: string;
  };
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

// ---- API ----
const fetchItems = async () => {
  const res = await axiosInstance.get<ApiResponse<IItemProps[]>>("/api/items");
  return res.data;
};

const createItemApi = async (payload: IItemProps) => {
  const res = await axiosInstance.post<ApiResponse<IItemProps>>(
    "/api/items/create",
    payload
  );
  return res.data;
};

const updateItemApi = async (payload: IItemProps) => {
  const res = await axiosInstance.put<ApiResponse<IItemProps>>(
    `/api/items/update/${payload.id}`,
    payload
  );
  return res.data;
};

const deleteItemApi = async (id: string) => {
  const res = await axiosInstance.delete<ApiResponse<IItemProps>>(
    `/api/items/delete/${id}`
  );
  return res.data;
};

// ---- Hook ----
export const useItem = () => {
  const qc = useQueryClient();

  // GET
  const {
    data: itemsData = [],
    isLoading,
    error,
    refetch: getItems,
  } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // CREATE
  const { mutate: createItem } = useMutation({
    mutationFn: createItemApi,
    onSuccess: () => {
      NotifAlert({
        type: "success",
        message: "Penambahan item berhasil.",
      });
      qc.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (err: any) => {
      NotifAlert({
        type: "error",
        message: err?.message ?? "An error occurred",
      });
    },
  });

  // UPDATE
  const { mutate: updateItem } = useMutation({
    mutationFn: updateItemApi,
    onSuccess: () => {
      NotifAlert({
        type: "success",
        message: "Update item berhasil.",
      });
      qc.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (err: any) => {
      NotifAlert({
        type: "error",
        message: err?.message ?? "An error occurred",
      });
    },
  });

  // DELETE
  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteItemApi,
    onSuccess: () => {
      NotifAlert({
        type: "success",
        message: "Delete item berhasil.",
      });
      qc.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (err: any) => {
      NotifAlert({
        type: "error",
        message: err?.message ?? "An error occurred",
      });
    },
  });

  return {
    itemsData,
    isLoading,
    errorState: error?.message ?? "",
    getItems,
    createItem,
    updateItem,
    deleteItem,
  };
};
