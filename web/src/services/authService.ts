// itemService.ts
import { ILoginFormInputs } from "../hooks/useAuth";
import { ApiResponse, IProfileResponseProps } from "../interface/interfaces";
import { api } from "../lib/api";

export const authService = {
  fetch: () => api.get<IProfileResponseProps>("/api/auth/profile"),

  login: (payload: ILoginFormInputs) =>
    api.post<ApiResponse<ILoginFormInputs>, ILoginFormInputs>(
      "/api/auth/login",
      payload
    ),

  logout: () => api.post<ApiResponse<null>, null>("/api/auth/logout"),
};
