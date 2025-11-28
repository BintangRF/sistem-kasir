import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { NotifAlert } from "../sharedComponent/NotifAlert";
import { useNavigate } from "react-router-dom";

export interface IAuthProps {
  username: string;
  password: string;
}

interface IProfileProps {
  id: number;
  username: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

const fetchProfile = async () => {
  const res = await axiosInstance.get<ApiResponse<IProfileProps[]>>(
    "/api/auth/profile"
  );
  return res.data;
};

const authLoginApi = async (payload: IAuthProps) => {
  const res = await axiosInstance.post<ApiResponse<IAuthProps>>(
    "/api/auth/login",
    payload
  );
  return res.data;
};

const authLogoutApi = async () => {
  const res = await axiosInstance.post<ApiResponse<IAuthProps>>(
    `/api/auth/logout`
  );
  return res.data;
};

export const useAuth = () => {
  const navigate = useNavigate();

  const {
    data: profileData = [],
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  // LOGIN
  const {
    mutate: authLogin,
    isPending,
    error,
  } = useMutation({
    mutationFn: authLoginApi,
    onSuccess: () => {
      NotifAlert({
        type: "success",
        message: "Login berhasil.",
      });

      navigate("/");
    },
    onError: (err: any) => {
      NotifAlert({
        type: "error",
        message: err?.message ?? "An error occurred",
      });
    },
  });

  // LOGOUT
  const { mutate: authLogout } = useMutation({
    mutationFn: authLogoutApi,
    onSuccess: () => {
      navigate("/login");
    },
  });

  return {
    errorState: error?.message ?? "",
    profileData,
    isProfileLoading,
    isProfileError,
    authLogin,
    authLogout,
    isPending,
  };
};
