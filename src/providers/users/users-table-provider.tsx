'use client';
import { COLUMNS } from '@/app/(pages)/(dashboard)/users/constants/COLUMNS';
import { useUsers } from '@/providers/users/users-provider';
import { User } from '@/types/users.types';
import { getCoreRowModel, Table, useReactTable } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

type ContextType<TData> = {
  table: Table<TData>;
};
const UsersTableContext = createContext<ContextType<User>>({
  table: {} as Table<User>,
});

const UsersTableProvider = ({
  children,
  users = [],
}: {
  children: React.ReactNode;
  users: User[];
}) => {
  const {
    params,
    queryResult: { data },
  } = useUsers();

  const table = useReactTable({
    data: users,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: params.page - 1 || 0,
        pageSize: params.limit || 10,
      },
    },
    rowCount: data?.data.totlaCount || 0,
  });

  return (
    <UsersTableContext.Provider
      value={{
        table,
      }}
    >
      {children}
    </UsersTableContext.Provider>
  );
};

const useUsersTable = () => {
  const context = useContext(UsersTableContext);

  if (context === undefined) {
    throw new Error('useUsersTable must be used within a UsersTableProvider');
  }

  return context;
};

export { UsersTableProvider, useUsersTable };
