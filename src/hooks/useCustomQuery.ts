import { useCallback, useEffect, useState } from 'react';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryFunction,
  useQueryClient,
} from 'react-query';
export type UseCustomQueryResult<TData, TError> = UseQueryResult<
  TData,
  TError
> & {
  isCancelled: boolean;
  cancelQuery: () => void;
};
const useCustomQuery = <TData = unknown, TError = unknown>(
  queryKey: string | unknown[],
  queryFn: QueryFunction<TData>,
  options?: UseQueryOptions<TData, TError>,
): UseCustomQueryResult<TData, TError> => {
  const queryClient = useQueryClient();
  const queryResult = useQuery<TData, TError>(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
    keepPreviousData: true,
    ...options,
  });
  const { isRefetching } = queryResult;

  const [isCancelled, setIsCancelled] = useState(false);
  const cancelQuery = useCallback(() => {
    queryClient.cancelQueries(['events']);
    setIsCancelled(true);
  }, [queryClient]);
  useEffect(() => {
    if (isRefetching) {
      setIsCancelled(false);
    }
  }, [isRefetching]);
  return {
    ...queryResult,
    isCancelled,
    cancelQuery,
  };
};

export default useCustomQuery;
