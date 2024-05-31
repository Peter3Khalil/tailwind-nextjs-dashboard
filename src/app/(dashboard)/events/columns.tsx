'use client';

import CellAction from '@/components/shared/CellAction';
import { Checkbox } from '@/components/ui/checkbox';
import type { Event, EventStatus } from '@/types/EventTypes';
import { ColumnDef } from '@tanstack/react-table';

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
  },
  { accessorKey: 'eventName', header: 'Event Name' },
  { accessorKey: 'eventDate', header: 'Event Date' },
  {
    accessorKey: 'eventStatus',
    header: 'Event Status',
    cell: ({ getValue }) => {
      const status: EventStatus = getValue() as EventStatus;
      if (status === 'pending')
        return <span className="text-primary">{status}</span>;
      else if (status === 'accepted') {
        return <span className="text-green-500">{status}</span>;
      } else {
        return <span className="text-destructive">{status}</span>;
      }
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
