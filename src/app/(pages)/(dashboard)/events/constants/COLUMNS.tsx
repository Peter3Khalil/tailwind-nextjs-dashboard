import AcceptButton from '@/app/(pages)/(dashboard)/events/components/AcceptButton';
import EventComponent from '@/app/(pages)/(dashboard)/events/components/EventComponent';
import RejectButton from '@/app/(pages)/(dashboard)/events/components/RejectButton';
import StatusFiltration from '@/app/(pages)/(dashboard)/events/components/StatusFiltration';
import { EVENT_STATUSES_COMPONENTS } from '@/app/(pages)/(dashboard)/events/constants/EVENT_STATUSES_COMPONENTS';
import EventsApi from '@/app/(pages)/(dashboard)/events/services/EventsApi';
import {
  Event,
  EventStatusWithOutAll,
} from '@/app/(pages)/(dashboard)/events/types/event.types';
import CellAction from '@/components/shared/CellAction';
import SelectAllCheckbox from '@/components/shared/SelectAllCheckbox';
import SelectRowCheckbox from '@/components/shared/SelectRowCheckbox';
import { formatDateTime } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';

export const COLUMNS: ColumnDef<Event>[] = [
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
    header: 'Name',
    cell: ({ row }) => <EventComponent event={row.original} />,
  },
  {
    accessorKey: 'eventDate',
    header: 'Date',
    cell: ({ getValue }) => formatDateTime(getValue() as string),
  },
  {
    accessorKey: 'eventPrice',
    header: 'Price',
    cell: ({ getValue }) => `$${getValue()}`,
  },
  {
    accessorKey: 'eventStatus',
    header: () => <StatusFiltration />,
    cell: ({ getValue }) => {
      const status: EventStatusWithOutAll = getValue() as EventStatusWithOutAll;
      return EVENT_STATUSES_COMPONENTS[status].component;
    },
  },
  {
    id: 'Accept or Reject',
    header: 'Action',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-xs">
        {row.original.eventStatus === 'pending' && (
          <>
            <AcceptButton event={row.original} />
            <RejectButton event={row.original} />
          </>
        )}
        {row.original.eventStatus === 'accepted' && (
          <RejectButton event={row.original} />
        )}
        {row.original.eventStatus === 'rejected' && (
          <AcceptButton event={row.original} />
        )}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction
        deleteFunction={EventsApi.delete}
        invalidateKey="events"
        updateHref={`/events/${row.original._id}`}
        model={row.original}
      />
    ),
  },
];
