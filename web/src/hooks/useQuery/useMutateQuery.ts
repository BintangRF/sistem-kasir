import { useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import { NotifAlert } from "../../sharedComponent/NotifAlert";
import { ErrorResponse } from "../../interface/interfaces";

type MutateOptions<TResponse> = {
  invalidateKey?: QueryKey;
  onSuccess?: (res: TResponse) => void;
  onError?: (err: ErrorResponse) => void;
};

export function useMutateQuery<
  TResponse extends { message?: string },
  TVariables
>(
  mutationFn: (payload: TVariables) => Promise<TResponse>,
  opts?: MutateOptions<TResponse>
) {
  const qc = useQueryClient();

  return useMutation<TResponse, ErrorResponse, TVariables>({
    mutationFn,

    onSuccess: (res) => {
      if (opts?.invalidateKey) {
        qc.invalidateQueries({ queryKey: opts.invalidateKey });
      }

      NotifAlert({
        type: "success",
        message: res?.message ?? "Success",
      });

      opts?.onSuccess?.(res);
    },

    onError: (err) => {
      NotifAlert({
        type: "error",
        message: err?.response?.data?.message ?? "Error",
      });

      opts?.onError?.(err);
    },
  });
}
