'use client';
import { INITIAL_QUERY_PARAMS } from '@/app/(pages)/(dashboard)/events/constants/INITIAL_QUERY_PARAMS';
import EventsApi from '@/app/(pages)/(dashboard)/events/services/EventsApi';
import {
  EventsQueryParams,
  GetAllEventsResponse,
} from '@/app/(pages)/(dashboard)/events/types/event.types';
import useCustomQuery, { UseCustomQueryResult } from '@/hooks/useCustomQuery';
import useDebounceEffect from '@/hooks/useDebounceEffect';
import { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

type ContextType<TData> = {
  queryResult: UseCustomQueryResult<TData, unknown>;
  setParams: React.Dispatch<React.SetStateAction<EventsQueryParams>>;
  params: EventsQueryParams;
};
const EventsContext = createContext<
  ContextType<AxiosResponse<GetAllEventsResponse>>
>({
  queryResult: {} as UseCustomQueryResult<
    AxiosResponse<GetAllEventsResponse>,
    unknown
  >,
  setParams: () => {},
  params: INITIAL_QUERY_PARAMS,
});

const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useState<EventsQueryParams>(INITIAL_QUERY_PARAMS);
  const [debounceParams, setDebounceParams] =
    useState<EventsQueryParams>(INITIAL_QUERY_PARAMS);
  const queryResult = useCustomQuery(['events', debounceParams], ({ signal }) =>
    EventsApi.getAll(debounceParams, { signal }),
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
    throw new Error('useEvents must be used within a EventsProvider');
  }

  return context;
};

export { EventsProvider, useEvents };
