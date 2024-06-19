import { Table } from '@tanstack/react-table';
import { Button } from './ui/button';
interface PaginationProps<TData> {
  table: Table<TData>;
}
const Pagination = <TData,>({ table }: PaginationProps<TData>) => {
  return (
    <>
      <Button
        onClick={() => table?.previousPage()}
        disabled={!table?.getCanPreviousPage()}
      >
        Prev
      </Button>
      <Button
        onClick={() => table?.nextPage()}
        disabled={!table?.getCanNextPage()}
      >
        Next Page
      </Button>
    </>
  );
};

export default Pagination;
