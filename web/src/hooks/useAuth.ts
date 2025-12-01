import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/authService";

// ---- API ----
export const useAuth = (opts?: {
  onSuccess?: (type: "login" | "logout") => void;
  onError?: (type: "login" | "logout", err: any) => void;
  enabled?: boolean;
}) => {
  const qc = useQueryClient();

  const {
    data: profileData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: authService.fetch,
    enabled: opts?.enabled ?? false,
  });

  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      opts?.onSuccess?.("login");
    },
    onError: (err) => opts?.onError?.("login", err),
  });

  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      opts?.onSuccess?.("logout");
    },
    onError: (err) => opts?.onError?.("logout", err),
  });

  return {
    profileData,
    isProfileLoading: isLoading,
    isProfileError: error,

    login: login.mutate,
    isLoadingLogin: login.isPending,
    logout: logout.mutate,
  };
};
