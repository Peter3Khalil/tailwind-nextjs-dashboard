'use client';
import DataTable from '@/components/data-table';
import { cn } from '@/lib/utils';
import { Table } from '@tanstack/react-table';
interface TableViewerProps<TData> {
  table: Table<TData>;
  isFetching: boolean;
  isLoading: boolean;
}
const TableViewer = <TData,>({
  isFetching,
  isLoading,
  table,
}: TableViewerProps<TData>) => {
  return (
    <div
      className={cn('flex flex-1 overflow-auto', {
        'animate-pulse duration-700': isLoading || isFetching,
      })}
    >
      <DataTable table={table} />
    </div>
  );
};

export default TableViewer;
