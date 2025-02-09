import CellAction from '@/components/shared/CellAction';
import SelectAllCheckbox from '@/components/shared/SelectAllCheckbox';
import SelectRowCheckbox from '@/components/shared/SelectRowCheckbox';
import UserComponent from '@/components/users/UserComponent';
import { Capitalize } from '@/lib/utils';
import UsersApi from '@/services/UsersApi';
import { User } from '@/types/users.types';
import { ColumnDef } from '@tanstack/react-table';

export const COLUMNS: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => <SelectRowCheckbox row={row} />,
    enableHiding: false,
  },
  {
    accessorKey: '_id',
    header: 'Id',
    cell: ({ row }) => row.index + 1,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <UserComponent user={row.original} />,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => Capitalize(row.original.role),
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => Capitalize(row.original.gender),
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
    enableHiding: false,
  },
];
