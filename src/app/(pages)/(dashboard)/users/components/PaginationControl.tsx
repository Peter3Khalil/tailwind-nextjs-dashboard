import { useUsers } from '@/app/(pages)/(dashboard)/users/providers/users-provider';
import { useUsersTable } from '@/app/(pages)/(dashboard)/users/providers/users-table-provider';
import MyPagination from '@/components/shared/MyPagination';
import SelectLimit from '@/components/shared/SelectLimit';
import React, { FC, useCallback, useEffect, useState } from 'react';

interface PaginationControlProps extends React.HTMLAttributes<HTMLDivElement> {}

const PaginationControl: FC<PaginationControlProps> = () => {
  const { table } = useUsersTable();
  const [limit, setLimit] = useState(10);
  const { setParams } = useUsers();

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
    <div className="flex w-full items-center justify-between border-t py-2">
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
