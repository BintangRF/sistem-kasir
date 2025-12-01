import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "../services/categoriesService";

// ---- API ----
export const useCategories = (opts?: {
  onSuccess?: (type: "create" | "update" | "delete") => void;
  onError?: (type: "create" | "update" | "delete", err: any) => void;
}) => {
  const qc = useQueryClient();

  const {
    data: categoriesData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesService.fetch,
  });

  const createCategory = useMutation({
    mutationFn: categoriesService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      opts?.onSuccess?.("create");
    },
    onError: (err) => opts?.onError?.("create", err),
  });

  const updateCategory = useMutation({
    mutationFn: categoriesService.update,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      opts?.onSuccess?.("update");
    },
    onError: (err) => opts?.onError?.("update", err),
  });

  const deleteCategory = useMutation({
    mutationFn: categoriesService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      opts?.onSuccess?.("delete");
    },
    onError: (err) => opts?.onError?.("delete", err),
  });

  return {
    categoriesData,
    isLoading,
    error,

    createCategory: createCategory.mutate,
    updateCategory: updateCategory.mutate,
    deleteCategory: deleteCategory.mutate,

    isLoadingCreate: createCategory.isPending,
    isLoadingUpdate: createCategory.isPending,
  };
};
