import CellAction from '@/components/shared/CellAction';
import { Capitalize, formatDateTime } from '@/lib/utils';
import CategoriesApi from '@/services/CategoriesApi';
import { Category } from '@/types/categories.types';
import { ColumnDef } from '@tanstack/react-table';

export const COLUMNS: ColumnDef<Category>[] = [
  {
    id: 'ID',
    accessorKey: '_id',
    header: 'Id',
    cell: ({ row }) => row.index + 1,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => Capitalize(row.original.title),
  },
  {
    id: 'Created At',
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => formatDateTime(row.original.createdAt),
  },
  {
    id: 'Updated At',
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => formatDateTime(row.original.updatedAt),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction
        deleteFunction={CategoriesApi.delete}
        invalidateKey="categories"
        updateHref={`/categories/${row.original._id}`}
        model={row.original}
      />
    ),
    enableHiding: false,
  },
];
