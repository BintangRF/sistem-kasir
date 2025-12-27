import { z } from "zod";
import { authService } from "../services/authService";
import { ApiResponse } from "../interface/interfaces";
import { useGetQuery } from "./useQuery/useGetQuery";
import { useMutateQuery } from "./useQuery/useMutateQuery";

// Schema login
export const loginSchema = z.object({
  username: z.string().nonempty("Username required"),
  password: z.string().nonempty("Password required"),
});

export type ILoginFormInputs = z.infer<typeof loginSchema>;

type SuccessLoginPayload = ApiResponse<ILoginFormInputs> | ApiResponse<null>;
type SuccessLogoutPayload = ApiResponse<null>;

export const useAuth = () => {
  const profileQuery = useGetQuery(["profile"], authService.fetch);

  const login = useMutateQuery<SuccessLoginPayload, ILoginFormInputs>(
    authService.login,
    {
      invalidateKey: ["profile"],
    }
  );

  const logout = useMutateQuery<SuccessLogoutPayload, null>(
    authService.logout,
    {
      invalidateKey: ["profile"],
    }
  );

  return {
    profileData: profileQuery.data,
    isProfileLoading: profileQuery.isLoading,
    isProfileError: profileQuery.error,

    login: login.mutate,
    isLoadingLogin: login.isPending,

    logout: logout.mutate,
    isLoadingLogout: logout.isPending,
  };
};
