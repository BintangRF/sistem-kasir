import { useQuery, QueryKey } from "@tanstack/react-query";

export function useGetQuery<T>(queryKey: QueryKey, queryFn: () => Promise<T>) {
  return useQuery<T>({
    queryKey,
    queryFn,
  });
}
