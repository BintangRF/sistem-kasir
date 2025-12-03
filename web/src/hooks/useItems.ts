import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { itemService } from "../services/itemsService";
import z from "zod";
import { ApiResponse, ErrorResponse } from "../interface/interfaces";

// Schema
export const itemsSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty("Name is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  categoryId: z.number(),
  category: z
    .object({
      name: z.string().nonempty("Category name is required"),
    })
    .optional(),
});

export type IItemsFormInputs = z.infer<typeof itemsSchema>;

type SuccessPayload = ApiResponse<IItemsFormInputs> | ApiResponse<null>;

interface UseItemsOptions {
  onSuccess?: (res: SuccessPayload) => void;
  onError?: (err: ErrorResponse) => void;
}

export const useItems = (opts?: UseItemsOptions) => {
  const qc = useQueryClient();

  const {
    data: itemsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["items"],
    queryFn: itemService.fetch,
  });

  const createItem = useMutation<
    SuccessPayload,
    ErrorResponse,
    IItemsFormInputs
  >({
    mutationFn: itemService.create,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["items"] });
      opts?.onSuccess?.(res);
    },
    onError: (err) => {
      opts?.onError?.(err);
    },
  });

  const updateItem = useMutation<
    SuccessPayload,
    ErrorResponse,
    IItemsFormInputs
  >({
    mutationFn: itemService.update,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["items"] });
      opts?.onSuccess?.(res);
    },
    onError: (err) => {
      opts?.onError?.(err);
    },
  });

  const deleteItem = useMutation<SuccessPayload, ErrorResponse, number>({
    mutationFn: itemService.delete,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["items"] });
      opts?.onSuccess?.(res);
    },
    onError: (err) => {
      opts?.onError?.(err);
    },
  });

  return {
    itemsData,
    isLoading,
    error,

    createItem: createItem.mutate,
    updateItem: updateItem.mutate,
    deleteItem: deleteItem.mutate,

    isLoadingCreate: createItem.isPending,
    isLoadingUpdate: updateItem.isPending,
  };
};
