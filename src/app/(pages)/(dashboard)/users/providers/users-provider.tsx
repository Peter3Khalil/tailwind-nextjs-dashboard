'use client';
import { INITIAL_QUERY_PARAMS } from '@/app/(pages)/(dashboard)/users/constants/INITIAL_QUERY_PARAMS';
import UsersApi from '@/app/(pages)/(dashboard)/users/services/UsersApi';
import { GetAllUsersResponse } from '@/app/(pages)/(dashboard)/users/types/users.types';
import useCustomQuery, { UseCustomQueryResult } from '@/hooks/useCustomQuery';
import useDebounceEffect from '@/hooks/useDebounceEffect';
import { GetAllQueryParams } from '@/types/global.types';
import { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

type ContextType<TData> = {
  queryResult: UseCustomQueryResult<TData, unknown>;
  setParams: React.Dispatch<React.SetStateAction<GetAllQueryParams>>;
  params: GetAllQueryParams;
};
const UsersContext = createContext<
  ContextType<AxiosResponse<GetAllUsersResponse>>
>({
  queryResult: {} as UseCustomQueryResult<
    AxiosResponse<GetAllUsersResponse>,
    unknown
  >,
  setParams: () => {},
  params: INITIAL_QUERY_PARAMS,
});

const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useState<GetAllQueryParams>(INITIAL_QUERY_PARAMS);
  const [debounceParams, setDebounceParams] =
    useState<GetAllQueryParams>(INITIAL_QUERY_PARAMS);
  const queryResult = useCustomQuery(['users', debounceParams], ({ signal }) =>
    UsersApi.getAll(debounceParams, { signal }),
  );

  useDebounceEffect(params, 500, setDebounceParams);
  useEffect(() => {
    setParams((prev) => ({ ...prev, page: 1 }));
  }, [params.limit]);
  //TODO: Set search params to query params on route change
  return (
    <UsersContext.Provider
      value={{
        queryResult,
        setParams,
        params: debounceParams,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

const useUsers = () => {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }

  return context;
};

export { UsersProvider, useUsers };
