'use client';
import { DEFAULT_QUERY_PARAMS } from '@/constants';
import useCustomQuery, { UseCustomQueryResult } from '@/hooks/useCustomQuery';
import useDebounceEffect from '@/hooks/useDebounceEffect';
import CategoriesApi from '@/services/CategoriesApi';
import { GetAllCategoriesResponse } from '@/types/categories.types';
import { GetAllQueryParams } from '@/types/global.types';
import { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

type ContextType<TData> = {
  queryResult: UseCustomQueryResult<TData, unknown>;
  setParams: React.Dispatch<React.SetStateAction<GetAllQueryParams>>;
  params: GetAllQueryParams;
};
const CategoriesContext = createContext<
  ContextType<AxiosResponse<GetAllCategoriesResponse>>
>({
  queryResult: {} as UseCustomQueryResult<
    AxiosResponse<GetAllCategoriesResponse>,
    unknown
  >,
  setParams: () => {},
  params: DEFAULT_QUERY_PARAMS,
});

const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useState<GetAllQueryParams>(DEFAULT_QUERY_PARAMS);
  const [debounceParams, setDebounceParams] =
    useState<GetAllQueryParams>(DEFAULT_QUERY_PARAMS);
  const queryResult = useCustomQuery(
    ['categories', debounceParams],
    ({ signal }) => CategoriesApi.getAll(debounceParams, { signal }),
  );

  useDebounceEffect(params, 500, setDebounceParams);
  useEffect(() => {
    setParams((prev) => ({ ...prev, page: 1 }));
  }, [params.limit]);
  //TODO: Set search params to query params on route change
  return (
    <CategoriesContext.Provider
      value={{
        queryResult,
        setParams,
        params: debounceParams,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }

  return context;
};

export { CategoriesProvider, useCategories };
