// itemService.ts
import {
  ApiResponse,
  IAuthPayloadProps,
  IProfileResponseProps,
} from "../interface/interfaces";
import { axiosInstance } from "../utils/axiosInstance";

export const authService = {
  fetch: () =>
    axiosInstance
      .get<ApiResponse<IProfileResponseProps[]>>("/api/auth/profile")
      .then((res) => res.data),

  login: (payload: IAuthPayloadProps) =>
    axiosInstance
      .post<ApiResponse<IAuthPayloadProps>>("/api/auth/login", payload)
      .then((res) => res.data),

  logout: () =>
    axiosInstance
      .post<ApiResponse<IAuthPayloadProps>>(`/api/auth/logout`)
      .then((res) => res.data),
};
