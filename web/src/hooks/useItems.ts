import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itemService } from "../services/itemsService";

export const useItems = (opts?: {
  onSuccess?: (type: "create" | "update" | "delete") => void;
  onError?: (type: "create" | "update" | "delete", err: any) => void;
}) => {
  const qc = useQueryClient();

  const {
    data: itemsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items"],
    queryFn: itemService.fetch,
  });

  const createItem = useMutation({
    mutationFn: itemService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
      opts?.onSuccess?.("create");
    },
    onError: (err) => opts?.onError?.("create", err),
  });

  const updateItem = useMutation({
    mutationFn: itemService.update,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
      opts?.onSuccess?.("update");
    },
    onError: (err) => opts?.onError?.("update", err),
  });

  const deleteItem = useMutation({
    mutationFn: itemService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
      opts?.onSuccess?.("delete");
    },
    onError: (err) => opts?.onError?.("delete", err),
  });

  return {
    itemsData,
    isLoading,
    error,

    createItem: createItem.mutate,
    updateItem: updateItem.mutate,
    deleteItem: deleteItem.mutate,

    isLoadingCreate: createItem.isPending,
    isLoadingUpdate: createItem.isPending,
  };
};
