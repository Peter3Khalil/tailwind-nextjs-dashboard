'use client';
import { useEvents } from '@/app/(pages)/(dashboard)/events/providers/events-provider';
import { useEventsTable } from '@/app/(pages)/(dashboard)/events/providers/events-table-provider';
import DataTable from '@/components/data-table';
import { cn } from '@/lib/utils';

const EventsTable = () => {
  const { table } = useEventsTable();
  const { queryResult } = useEvents();

  return (
    <div
      className={cn('flex flex-1 overflow-auto', {
        'animate-pulse duration-700':
          queryResult.isLoading || queryResult.isFetching,
      })}
    >
      <DataTable table={table} />
    </div>
  );
};

export default EventsTable;
