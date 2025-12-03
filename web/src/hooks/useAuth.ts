import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";
import z from "zod";
import { ApiResponse, ErrorResponse } from "../interface/interfaces";

// Schema login
export const loginSchema = z.object({
  username: z.string().nonempty("Username required"),
  password: z.string().nonempty("Password required"),
});

export type ILoginFormInputs = z.infer<typeof loginSchema>;

export const useAuth = (opts?: {
  onSuccess?: (res?: ApiResponse<ILoginFormInputs> | ApiResponse<null>) => void;
  onError?: (err: ErrorResponse) => void;
  enabled?: boolean;
}) => {
  const qc = useQueryClient();

  // GET profile
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: authService.fetch,
    enabled: opts?.enabled ?? false,
  });

  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      opts?.onSuccess?.(res);
    },
    onError: (err: unknown) => opts?.onError?.(err as ErrorResponse),
  });

  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      opts?.onSuccess?.(res);
    },
    onError: (err: unknown) => opts?.onError?.(err as ErrorResponse),
  });

  return {
    profileData: profileData?.data,
    isProfileLoading: isLoading,
    isProfileError: error,

    login: login.mutate,
    isLoadingLogin: login.isPending,

    logout: logout.mutate,
  };
};
