'use client';
import DataTable from '@/components/data-table';
import { cn } from '@/lib/utils';
import { useEvents } from '../providers/events-provider';
import { useEventsTable } from '../providers/events-table-provider';

const EventsTable = () => {
  const { table } = useEventsTable();
  const { queryResult } = useEvents();

  return (
    <div
      className={cn('flex flex-1 overflow-auto', {
        'animate-pulse': queryResult.isLoading || queryResult.isFetching,
      })}
    >
      <DataTable table={table} />
    </div>
  );
};

export default EventsTable;
