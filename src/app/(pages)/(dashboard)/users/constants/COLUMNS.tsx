import UsersApi from '@/app/(pages)/(dashboard)/users/services/UsersApi';
import { User } from '@/app/(pages)/(dashboard)/users/types/users.types';
import CellAction from '@/components/shared/CellAction';
import SelectAllCheckbox from '@/components/shared/SelectAllCheckbox';
import SelectRowCheckbox from '@/components/shared/SelectRowCheckbox';
import { ColumnDef } from '@tanstack/react-table';

export const COLUMNS: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => <SelectRowCheckbox row={row} />,
  },
  {
    accessorKey: '_id',
    header: 'Id',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ getValue }) => getValue(),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction
        deleteFunction={UsersApi.delete}
        invalidateKey="users"
        updateHref={`/users/${row.original._id}`}
        model={row.original}
      />
    ),
  },
];
