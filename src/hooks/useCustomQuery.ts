import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryFunction,
} from 'react-query';

const useCustomQuery = <TData = unknown, TError = unknown>(
  queryKey: string | unknown[],
  queryFn: QueryFunction<TData>,
  options?: UseQueryOptions<TData, TError>,
): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError>(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    retry: false,
    ...options,
  });
};

export default useCustomQuery;
