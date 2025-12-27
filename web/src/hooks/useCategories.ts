import { z } from "zod";
import { categoriesService } from "../services/categoriesService";
import { ApiResponse } from "../interface/interfaces";
import { useGetQuery } from "./useQuery/useGetQuery";
import { useMutateQuery } from "./useQuery/useMutateQuery";

export const categoriesSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty("Name is required"),
});

export type ICategoriesFormInputs = z.infer<typeof categoriesSchema>;

type SuccessPayload = ApiResponse<ICategoriesFormInputs> | ApiResponse<null>;

export const useCategories = () => {
  const {
    data: categoriesData = [],
    isLoading,
    error,
  } = useGetQuery(["categories"], categoriesService.fetch);

  const createCategory = useMutateQuery<SuccessPayload, ICategoriesFormInputs>(
    categoriesService.create,
    {
      invalidateKey: ["categories"],
    }
  );

  const updateCategory = useMutateQuery<SuccessPayload, ICategoriesFormInputs>(
    categoriesService.update,
    {
      invalidateKey: ["categories"],
    }
  );

  const deleteCategory = useMutateQuery<SuccessPayload, number>(
    categoriesService.delete,
    {
      invalidateKey: ["categories"],
    }
  );

  return {
    categoriesData,
    isLoading,
    error,

    createCategory: createCategory.mutate,
    updateCategory: updateCategory.mutate,
    deleteCategory: deleteCategory.mutate,

    isLoadingCreate: createCategory.isPending,
    isLoadingUpdate: updateCategory.isPending,
    isLoadingDelete: deleteCategory.isPending,
  };
};
