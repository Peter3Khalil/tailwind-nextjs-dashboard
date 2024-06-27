'use client';
import { COLUMNS } from '@/providers/users/COLUMNS';
import { useUsers } from '@/providers/users/users-provider';
import { User } from '@/types/users.types';
import {
  getCoreRowModel,
  Table,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { createContext, useContext, useState } from 'react';

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
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: users,
    columns: COLUMNS,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      pagination: {
        pageIndex: params.page - 1 || 0,
        pageSize: params.limit || 10,
      },
      columnVisibility,
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
