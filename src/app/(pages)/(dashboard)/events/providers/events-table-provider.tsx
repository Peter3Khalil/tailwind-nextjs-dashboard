'use client';
import { COLUMNS } from '@/app/(pages)/(dashboard)/events/constants/COLUMNS';
import { Event } from '@/app/(pages)/(dashboard)/events/types/event.types';
import { getCoreRowModel, Table, useReactTable } from '@tanstack/react-table';
import { createContext, useContext } from 'react';
import { useEvents } from './events-provider';

type ContextType<TData> = {
  table: Table<TData>;
};
const EventsTableContext = createContext<ContextType<Event>>({
  table: {} as Table<Event>,
});

const EventsTableProvider = ({
  children,
  events = [],
}: {
  children: React.ReactNode;
  events: Event[];
}) => {
  const {
    params,
    queryResult: { data },
  } = useEvents();

  const table = useReactTable({
    data: events,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: params.page - 1 || 0,
        pageSize: params.limit || 10,
      },
    },
    rowCount: data?.data.totlaCount || 0,
  });

  return (
    <EventsTableContext.Provider
      value={{
        table,
      }}
    >
      {children}
    </EventsTableContext.Provider>
  );
};

const useEventsTable = () => {
  const context = useContext(EventsTableContext);

  if (context === undefined) {
    throw new Error('useEventsTable must be used within a EventsTableProvider');
  }

  return context;
};

export { EventsTableProvider, useEventsTable };
