import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesService } from "../services/categoriesService";
import z from "zod";
import { ApiResponse, ErrorResponse } from "../interface/interfaces";

export const categoriesSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty("Name is required"),
});

export type ICategoriesFormInputs = z.infer<typeof categoriesSchema>;

type SuccessPayload = ApiResponse<ICategoriesFormInputs> | ApiResponse<null>;

// ---- API ----
export const useCategories = (opts?: {
  onSuccess?: (res?: SuccessPayload) => void;
  onError?: (err: ErrorResponse) => void;
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

  const createCategory = useMutation<
    SuccessPayload,
    ErrorResponse,
    ICategoriesFormInputs
  >({
    mutationFn: categoriesService.create,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      opts?.onSuccess?.(res);
    },

    onError: (err: unknown) => opts?.onError?.(err as ErrorResponse),
  });

  const updateCategory = useMutation<
    SuccessPayload,
    ErrorResponse,
    ICategoriesFormInputs
  >({
    mutationFn: categoriesService.update,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      opts?.onSuccess?.(res);
    },

    onError: (err: unknown) => opts?.onError?.(err as ErrorResponse),
  });

  const deleteCategory = useMutation<SuccessPayload, ErrorResponse, number>({
    mutationFn: categoriesService.delete,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      opts?.onSuccess?.(res);
    },

    onError: (err: unknown) => opts?.onError?.(err as ErrorResponse),
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
