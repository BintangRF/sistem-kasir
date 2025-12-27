import { z } from "zod";
import { itemService } from "../services/itemsService";
import { ApiResponse } from "../interface/interfaces";
import { useGetQuery } from "./useQuery/useGetQuery";
import { useMutateQuery } from "./useQuery/useMutateQuery";

// Schema
export const itemsSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty("Name is required"),
  price: z.number().min(1),
  categoryId: z.number(),
  category: z
    .object({
      name: z.string(),
    })
    .optional(),
});

export type IItemsFormInputs = z.infer<typeof itemsSchema>;

type SuccessPayload = ApiResponse<IItemsFormInputs> | ApiResponse<null>;

export const useItems = () => {
  const itemsQuery = useGetQuery(["items"], itemService.fetch);

  const createItem = useMutateQuery<SuccessPayload, IItemsFormInputs>(
    itemService.create,
    {
      invalidateKey: ["items"],
    }
  );

  const updateItem = useMutateQuery<SuccessPayload, IItemsFormInputs>(
    itemService.update,
    {
      invalidateKey: ["items"],
    }
  );

  const deleteItem = useMutateQuery<SuccessPayload, number>(
    itemService.delete,
    {
      invalidateKey: ["items"],
    }
  );

  return {
    itemsData: itemsQuery.data ?? [],
    isLoading: itemsQuery.isLoading,
    error: itemsQuery.error,

    createItem: createItem.mutate,
    updateItem: updateItem.mutate,
    deleteItem: deleteItem.mutate,

    isLoadingCreate: createItem.isPending,
    isLoadingUpdate: updateItem.isPending,
    isLoadingDelete: deleteItem.isPending,
  };
};
