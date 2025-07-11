import axios from "axios";
import React, { useState } from "react";
import { NotifAlert } from "../sharedComponent/NotifAlert";

interface ICategoryProps {
  name: string;
  id: string;
}

interface ApiResponse<T> {
  [x: string]: any;
  data: T;
  message?: string;
}

export const API_URL = import.meta.env.VITE_API_URL;

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState("");
  const [categoriesData, setCategoriesData] = useState<ICategoryProps[]>([]);

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

  const getCategories = async () => {
    handleApiCall(
      () => axios.get(`${API_URL}/api/categories`),
      (data) => setCategoriesData(data),
      (message) => console.error(message)
    );
  };

  const createCategory = async (categoryData: ICategoryProps) => {
    handleApiCall(
      () =>
        axios.post<ApiResponse<ICategoryProps>>(
          `${API_URL}/api/categories`,
          categoryData
        ),
      (data) => {
        NotifAlert({
          type: "success",
          message: "Penambahan Kategori berhasil.",
        });
        getCategories();
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

  const updateCategory = async (categoryData: ICategoryProps) => {
    handleApiCall(
      () =>
        axios.put<ApiResponse<ICategoryProps>>(
          `${API_URL}/api/categories/${categoryData.id}`,
          categoryData
        ),
      (data) => {
        NotifAlert({
          type: "success",
          message: "Update Kategori berhasil.",
        });
        getCategories();
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

  const deleteCategory = async (categoryId: string) => {
    handleApiCall(
      () =>
        axios.delete<ApiResponse<ICategoryProps>>(
          `${API_URL}/api/categories/${categoryId}`
        ),
      (data) => {
        NotifAlert({
          type: "success",
          message: "Delete Kategori berhasil.",
        });
        getCategories();
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
    categoriesData,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
