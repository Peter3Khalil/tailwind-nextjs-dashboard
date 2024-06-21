'use client';
import EventsApi from '@/app/(dashboard)/events/services/EventsApi';
import useCustomQuery from '@/hooks/useCustomQuery';
import useDebounceEffect from '@/hooks/useDebounceEffect';
import {
  GetAllEventsResponse,
  GetAllParamsType,
} from '@/app/(dashboard)/events/types/event.types';
import { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { UseQueryResult } from 'react-query';

const INITIAL_PARAMS: GetAllParamsType = {
  limit: 5,
  keyword: '',
  page: 1,
  eventStatus: 'all',
};

type ContextType<TData> = {
  queryResult: UseQueryResult<TData, unknown>;
  setParams: React.Dispatch<React.SetStateAction<GetAllParamsType>>;
  params: GetAllParamsType;
};
const EventsContext = createContext<
  ContextType<AxiosResponse<GetAllEventsResponse>>
>({
  queryResult: {} as UseQueryResult<
    AxiosResponse<GetAllEventsResponse>,
    unknown
  >,
  setParams: () => {},
  params: INITIAL_PARAMS,
});

const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useState<GetAllParamsType>(INITIAL_PARAMS);
  const [debounceParams, setDebounceParams] =
    useState<GetAllParamsType>(INITIAL_PARAMS);
  const queryResult = useCustomQuery(['events', debounceParams], () =>
    EventsApi.getAll(debounceParams),
  );

  useDebounceEffect(params, 500, setDebounceParams);
  useEffect(() => {
    setParams((prev) => ({ ...prev, page: 1 }));
  }, [params.limit]);
  //TODO: Set search params to query params on route change
  return (
    <EventsContext.Provider
      value={{
        queryResult,
        setParams,
        params: debounceParams,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

const useEvents = () => {
  const context = useContext(EventsContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { EventsProvider, useEvents };
