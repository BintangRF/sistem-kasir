// itemService.ts
import { ILoginFormInputs } from "../hooks/useAuth";
import {
  ApiResponse,
  ILogoutResponseProps,
  IProfileResponseProps,
} from "../interface/interfaces";
import { api } from "../lib/api";

export const authService = {
  fetch: () => api.get<IProfileResponseProps>("/api/auth/profile"),

  login: (payload: ILoginFormInputs) =>
    api.post<ApiResponse<ILoginFormInputs>, ILoginFormInputs>(
      "/api/auth/login",
      payload
    ),

  logout: () =>
    api.post<ApiResponse<ILogoutResponseProps>, ILogoutResponseProps>(
      "/api/auth/logout"
    ),
};
