'use client';
import SelectAllCheckbox from '@/components/shared/SelectAllCheckbox';
import SelectRowCheckbox from '@/components/shared/SelectRowCheckbox';
import { useToast } from '@/components/ui/use-toast';
import { STATUSES } from '@/constants/eventStatuses';
import EventsApi from '@/features/EventsApi';
import { formatDateTime, toastError } from '@/lib/utils';
import { Event, EventStatusWithOutAll } from '@/types/event.types';
import {
  ColumnDef,
  getCoreRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import AcceptButton from '../components/AcceptButton';
import EventComponent from '../components/EventComponent';
import RejectButton from '../components/RejectButton';
import { useEvents } from './events-provider';
import CellAction from '@/app/(dashboard)/events/components/CellAction';
const eventActions = (id: string) => ({
  accept: () => EventsApi.accept(id),
  reject: () => EventsApi.reject(id),
  delete: () => EventsApi.delete(id),
});

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
  const { toast } = useToast();
  const printError = useCallback(
    (error: unknown) => toastError(error, toast),
    [toast],
  );
  const queryClient = useQueryClient();
  const {
    params,
    queryResult: { data },
  } = useEvents();

  const handleEventAction = useCallback(
    async (action: 'accept' | 'reject' | 'delete', id: string) => {
      try {
        await eventActions(id)[action]();
      } catch (error) {
        printError(error);
      } finally {
        queryClient.invalidateQueries('events');
      }
    },
    [printError, queryClient],
  );

  const columns: ColumnDef<Event>[] = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => <SelectAllCheckbox table={table} />,
        cell: ({ row }) => <SelectRowCheckbox row={row} />,
      },
      {
        accessorKey: '_id',
        header: 'Id',
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: 'eventName',
        header: 'Event Name',
        cell: ({ row }) => <EventComponent event={row.original} />,
      },
      {
        accessorKey: 'eventDate',
        header: 'Event Date',
        cell: ({ getValue }) => formatDateTime(getValue() as string),
      },
      {
        accessorKey: 'eventStatus',
        header: 'Status',
        cell: ({ getValue }) => {
          const status: EventStatusWithOutAll =
            getValue() as EventStatusWithOutAll;
          return STATUSES[status].component;
        },
      },
      {
        id: 'Accept or Reject',
        header: 'Action',
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            {row.original.eventStatus === 'pending' && (
              <>
                <AcceptButton
                  onClick={() => handleEventAction('accept', row.original._id)}
                />
                <RejectButton
                  onClick={() => handleEventAction('reject', row.original._id)}
                />
              </>
            )}
            {row.original.eventStatus === 'accepted' && (
              <RejectButton
                onClick={() => handleEventAction('reject', row.original._id)}
              />
            )}
            {row.original.eventStatus === 'rejected' && (
              <AcceptButton
                onClick={() => handleEventAction('accept', row.original._id)}
              />
            )}
          </div>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => <CellAction event={row.original} />,
      },
    ],
    [handleEventAction],
  );

  const table = useReactTable({
    data: events,
    columns,
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
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export { EventsTableProvider, useEventsTable };
