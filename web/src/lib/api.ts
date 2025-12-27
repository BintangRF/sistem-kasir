import { axiosInstance } from "./axiosInstance";

export const api = {
  get: async <T>(url: string, params?: Record<string, any>) => {
    const res = await axiosInstance.get(url, { params });
    return res.data.data as T;
  },

  post: async <T, P>(url: string, payload?: P) => {
    const res = await axiosInstance.post(url, payload);
    return res.data as T;
  },

  put: async <T, P>(url: string, payload: P) => {
    const res = await axiosInstance.put(url, payload);
    return res.data as T;
  },

  delete: async <T>(url: string) => {
    const res = await axiosInstance.delete(url);
    return res.data as T;
  },
};
