'use client';
import { useCategories } from '@/providers/categories/categories-provider';
import { COLUMNS } from '@/providers/categories/COLUMNS';
import { Category } from '@/types/categories.types';
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
const CategoriesTableContext = createContext<ContextType<Category>>({
  table: {} as Table<Category>,
});

const CategoriesTableProvider = ({
  children,
  categories = [],
}: {
  children: React.ReactNode;
  categories: Category[];
}) => {
  const {
    params,
    queryResult: { data },
  } = useCategories();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data: categories,
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
    <CategoriesTableContext.Provider
      value={{
        table,
      }}
    >
      {children}
    </CategoriesTableContext.Provider>
  );
};

const useCategoriesTable = () => {
  const context = useContext(CategoriesTableContext);

  if (context === undefined) {
    throw new Error(
      'useCategoriesTable must be used within a CategoriesTableProvider',
    );
  }

  return context;
};

export { CategoriesTableProvider, useCategoriesTable };
