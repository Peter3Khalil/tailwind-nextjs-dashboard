'use client';
import { useUsers } from '@/app/(pages)/(dashboard)/users/providers/users-provider';
import { useUsersTable } from '@/app/(pages)/(dashboard)/users/providers/users-table-provider';
import DataTable from '@/components/data-table';

import { cn } from '@/lib/utils';

const UsersTable = () => {
  const { table } = useUsersTable();
  const { queryResult } = useUsers();
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

export default UsersTable;
