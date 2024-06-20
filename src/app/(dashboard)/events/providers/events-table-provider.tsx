'use client';
import CellAction from '@/components/shared/CellAction';
import { CancelIcon, CheckIcon } from '@/components/shared/Icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import EventsApi from '@/features/EventsApi';
import { Event, EventStatus } from '@/types/event.types';
import {
  ColumnDef,
  getCoreRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';
import { createContext, useCallback, useContext, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useEvents } from './events-provider';
import { cn, formatDateTime } from '@/lib/utils';
import Link from 'next/link';

type StatusesType = {
  // eslint-disable-next-line no-unused-vars
  [key in EventStatusWithOutAll]: { component: JSX.Element };
};
type EventStatusWithOutAll = Exclude<EventStatus, 'all'>;
const statuses: StatusesType = {
  rejected: {
    component: (
      <Badge className="capitalize" variant={'destructive'}>
        <p className="text-[12px] font-normal">rejected</p>
      </Badge>
    ),
  },
  pending: {
    component: (
      <Badge className="capitalize">
        <p className="text-[12px] font-normal">Pending</p>
      </Badge>
    ),
  },
  accepted: {
    component: (
      <Badge className="text-xs capitalize" variant={'secondary'}>
        <p className="text-[12px] font-normal">accepted</p>
      </Badge>
    ),
  },
};

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
  const queryClient = useQueryClient();
  const {
    params,
    queryResult: { data },
  } = useEvents();

  const handleAccept = useCallback(
    async (id: string) => {
      EventsApi.accept(id);
      queryClient.invalidateQueries('events');
    },
    [queryClient],
  );

  const handleReject = useCallback(
    async (id: string) => {
      EventsApi.reject(id);
      queryClient.invalidateQueries('events');
    },
    [queryClient],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      EventsApi.delete(id);
      queryClient.invalidateQueries('events');
    },
    [queryClient],
  );

  const columns: ColumnDef<Event>[] = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
      },
      {
        accessorKey: '_id',
        header: 'Id',
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: 'eventName',
        header: 'Event Name',
        cell: ({ getValue, row }) => (
          <div className="flex w-full flex-col overflow-hidden text-ellipsis text-xs">
            <h4 className="overflow-hidden text-ellipsis font-semibold">
              <Link href={`/events/${row.original._id}`}>
                {getValue() as string}
              </Link>
            </h4>
            <Record
              label="organization name"
              value={row.original.organizationName}
            />
            <Record label="location" value={row.original.eventAddress} />
            <Record label="Description" value={row.original.eventDescription} />
          </div>
        ),
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
          return statuses[status].component;
        },
      },
      {
        id: 'Accept or Reject',
        header: 'Action',
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-xs">
            <Button
              variant={'secondary'}
              className="h-auto p-1"
              onClick={() => handleAccept(row.original._id)}
            >
              <CheckIcon size={16} />
            </Button>
            <Button
              variant={'secondary'}
              className="h-auto p-1"
              onClick={() => handleReject(row.original._id)}
            >
              <CancelIcon size={16} />
            </Button>
          </div>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <CellAction
            updateHref={`/events/${row.original._id}`}
            deleteFn={() => {
              handleDelete(row.original._id);
            }}
          />
        ),
      },
    ],
    [handleAccept, handleDelete, handleReject],
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

interface RecordProps extends React.HTMLAttributes<HTMLParagraphElement> {
  label: string;
  value: string | number;
}
const Record = ({ label, value, className, ...props }: RecordProps) => (
  <p
    className={cn(
      'w-full overflow-hidden text-ellipsis text-[0.9em] text-muted-foreground',
      className,
    )}
    title={value.toString()}
    {...props}
  >
    <span className="mr-1 capitalize">{label}: </span>
    <span className="font-medium">{value}</span>
  </p>
);
