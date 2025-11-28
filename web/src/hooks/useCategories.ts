import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { NotifAlert } from "../sharedComponent/NotifAlert";

export interface ICategoryProps {
  id: string;
  name: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

// ---- API ----
const fetchCategories = async () => {
  const res = await axiosInstance.get<ApiResponse<ICategoryProps[]>>(
    "/api/categories"
  );
  return res.data;
};

const createCategoryApi = async (payload: ICategoryProps) => {
  const res = await axiosInstance.post<ApiResponse<ICategoryProps>>(
    "/api/categories/create",
    payload
  );
  return res.data;
};

const updateCategoryApi = async (payload: ICategoryProps) => {
  const res = await axiosInstance.put<ApiResponse<ICategoryProps>>(
    `/api/categories/update/${payload.id}`,
    payload
  );
  return res.data;
};

const deleteCategoryApi = async (id: string) => {
  const res = await axiosInstance.delete<ApiResponse<ICategoryProps>>(
    `/api/categories/delete/${id}`
  );
  return res.data;
};

// ---- Hook ----
export const useCategories = () => {
  const qc = useQueryClient();

  // GET
  const {
    data: categoriesData = [],
    isLoading,
    error,
    refetch: getCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // CREATE
  const { mutate: createCategory } = useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      NotifAlert({
        type: "success",
        message: "Penambahan kategori berhasil.",
      });
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) => {
      NotifAlert({
        type: "error",
        message: err?.message ?? "An error occurred",
      });
    },
  });

  // UPDATE
  const { mutate: updateCategory } = useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      NotifAlert({
        type: "success",
        message: "Update kategori berhasil.",
      });
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) => {
      NotifAlert({
        type: "error",
        message: err?.message ?? "An error occurred",
      });
    },
  });

  // DELETE
  const { mutate: deleteCategory } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: () => {
      NotifAlert({
        type: "success",
        message: "Delete kategori berhasil.",
      });
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err: any) => {
      NotifAlert({
        type: "error",
        message: err?.message ?? "An error occurred",
      });
    },
  });

  return {
    categoriesData,
    isLoading,
    errorState: error?.message ?? "",
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
