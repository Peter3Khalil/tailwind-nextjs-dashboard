'use client';

import CellAction from '@/components/shared/CellAction';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import type { Event, EventStatus } from '@/types/event.types';
import { ColumnDef } from '@tanstack/react-table';

type EventStatusWithOutAll = Exclude<EventStatus, 'all'>;

type StatusesType = {
  // eslint-disable-next-line no-unused-vars
  [key in EventStatusWithOutAll]: { component: JSX.Element };
};
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

export const columns: ColumnDef<Event>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
  { accessorKey: 'eventName', header: 'Event Name' },
  { accessorKey: 'eventDate', header: 'Event Date' },
  {
    accessorKey: 'eventStatus',
    header: 'Status',
    cell: ({ getValue }) => {
      const status: EventStatusWithOutAll = getValue() as EventStatusWithOutAll;
      return statuses[status].component;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction
        updateHref={`/events/${row.original._id}`}
        deleteFn={() => {
          console.log('Delete');
        }}
      />
    ),
  },
];
