// itemService.ts
import { ILoginFormInputs } from "../hooks/useAuth";
import { axiosInstance } from "../utils/axiosInstance";

export const authService = {
  fetch: () => axiosInstance.get("/api/auth/profile").then((res) => res.data),

  login: (payload: ILoginFormInputs) =>
    axiosInstance.post("/api/auth/login", payload).then((res) => res.data),

  logout: () => axiosInstance.post(`/api/auth/logout`).then((res) => res.data),
};
