'use client';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import ColumnsVisibilityDropMenu from '@/components/shared/ColumnsVisibilityDropMenu';
import { UserIcon } from '@/components/shared/Icons';
import PaginationControl from '@/components/shared/PaginationControl';
import Search from '@/components/shared/Search';
import TableViewer from '@/components/shared/TableViewer';
import { Button } from '@/components/ui/button';
import useRefetch from '@/hooks/useRefetch';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { useUsers } from '@/providers/users/users-provider';
import {
  UsersTableProvider,
  useUsersTable,
} from '@/providers/users/users-table-provider';
import Link from 'next/link';

const Users = () => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/users/All Users' });
  const { table } = useUsersTable();
  const {
    setParams,
    queryResult: {
      data,
      refetch: refresh,
      isLoading,
      isFetching,
      isFetched,
      isCancelled,
      cancelQuery,
    },
  } = useUsers();

  const { RequestActionsButtons, requestState } = useRefetch({
    isFetching,
    isLoading,
    isFetched,
    isCancelled,
    refresh,
    cancelQuery,
  });

  return (
    <PageContent>
      <PageHeader>
        <div>
          <div className="flex w-fit flex-col sm:flex-row sm:items-center sm:gap-2">
            <PageTitle>Users ({data?.data.results || 0})</PageTitle>
            <div className="flex items-center gap-1">
              {RequestActionsButtons[requestState]}
            </div>
          </div>
          <PageDescription>Manage all users in one place</PageDescription>
        </div>
        <Button asChild>
          <Link href="/users/create" className="flex items-center gap-2">
            <UserIcon />
            <span className="hidden sm:block"> Create User</span>
          </Link>
        </Button>
      </PageHeader>
      <div className="flex w-full items-center justify-between gap-2 pr-2">
        <Search setParams={setParams} />
        <ColumnsVisibilityDropMenu table={table} />
      </div>
      <TableViewer
        table={table}
        isFetching={isFetching}
        isLoading={isLoading}
      />
      <PaginationControl setParams={setParams} table={table} />
    </PageContent>
  );
};

const Wrapper = () => {
  const {
    queryResult: { data },
  } = useUsers();
  return (
    <UsersTableProvider users={data?.data.data || []}>
      <Users />
    </UsersTableProvider>
  );
};

export default Wrapper;
