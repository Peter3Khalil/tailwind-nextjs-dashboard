import { useEvents } from '@/app/(pages)/(dashboard)/events/providers/events-provider';
import { useEventsTable } from '@/app/(pages)/(dashboard)/events/providers/events-table-provider';
import MyPagination from '@/components/shared/MyPagination';
import SelectLimit from '@/components/shared/SelectLimit';
import React, { FC, useCallback, useEffect, useState } from 'react';

interface PaginationControlProps extends React.HTMLAttributes<HTMLDivElement> {}

const PaginationControl: FC<PaginationControlProps> = () => {
  const { table } = useEventsTable();
  const [limit, setLimit] = useState(10);
  const { setParams } = useEvents();

  const nextPage = useCallback(() => {
    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [setParams]);
  const prevPage = useCallback(() => {
    setParams((prev) => ({ ...prev, page: prev.page - 1 }));
  }, [setParams]);

  useEffect(() => {
    setParams((prev) => ({ ...prev, limit }));
  }, [limit, setParams]);

  return (
    <div className="flex w-full items-center justify-between border-t px-6 py-2">
      <div className="flex items-center gap-3">
        <MyPagination table={table} nextPage={nextPage} prevPage={prevPage} />
        <SelectLimit onValueChange={(value) => setLimit(+value)} />
      </div>
      <span className="text-xs text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </span>
    </div>
  );
};

export default PaginationControl;
