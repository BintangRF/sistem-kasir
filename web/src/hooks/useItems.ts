import axios from "axios";
import React, { useState } from "react";
import { NotifAlert } from "../sharedComponent/NotifAlert";

interface IItemProps {
  name: string;
  price: number;
  categoryId: number;
  category: {
    name: string;
  };
  id: string;
}

interface ApiResponse<T> {
  [x: string]: any;
  data: T;
  message?: string;
}

export const API_URL = import.meta.env.VITE_API_URL;

export const useItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState("");
  const [itemsData, setItemsData] = useState<IItemProps[]>([]);

  const handleApiCall = async <T>(
    apiCall: () => Promise<ApiResponse<T>>,
    onSuccess: (data: T) => void,
    onError: (message: string) => void
  ) => {
    setIsLoading(true);
    try {
      const response = await apiCall();
      onSuccess(response.data);
      setErrorState("");
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred";
      setErrorState(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getItems = async () => {
    handleApiCall(
      () => axios.get(`${API_URL}/api/items`),
      (data) => setItemsData(data),
      (message) => console.error(message)
    );
  };

  const createItem = async (itemData: IItemProps) => {
    handleApiCall(
      () =>
        axios.post<ApiResponse<IItemProps>>(`${API_URL}/api/items`, itemData),
      (data) => {
        NotifAlert({
          type: "success",
          message: "Penambahan Item berhasil.",
        });
        getItems();
        return data;
      },
      (message) => {
        NotifAlert({
          type: "error",
          message,
        });
      }
    );
  };

  const updateItem = async (itemData: IItemProps) => {
    handleApiCall(
      () =>
        axios.put<ApiResponse<IItemProps>>(
          `${API_URL}/api/items/${itemData.id}`,
          itemData
        ),
      (data) => {
        NotifAlert({
          type: "success",
          message: "Update Item berhasil.",
        });
        getItems();
        return data;
      },
      (message) => {
        NotifAlert({
          type: "error",
          message,
        });
      }
    );
  };

  const deleteItem = async (itemId: string) => {
    handleApiCall(
      () =>
        axios.delete<ApiResponse<IItemProps>>(`${API_URL}/api/items/${itemId}`),
      (data) => {
        NotifAlert({
          type: "success",
          message: "Delete Item berhasil.",
        });
        getItems();
        return data;
      },
      (message) => {
        NotifAlert({
          type: "error",
          message,
        });
      }
    );
  };

  return {
    isLoading,
    errorState,
    itemsData,
    getItems,
    createItem,
    updateItem,
    deleteItem,
  };
};
