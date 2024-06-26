'use client';
import PaginationControl from '@/app/(pages)/(dashboard)/users/components/PaginationControl';
import Search from '@/app/(pages)/(dashboard)/users/components/Search';
import UsersTable from '@/app/(pages)/(dashboard)/users/components/UsersTable';
import { useUsers } from '@/app/(pages)/(dashboard)/users/providers/users-provider';
import { UsersTableProvider } from '@/app/(pages)/(dashboard)/users/providers/users-table-provider';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import { UserIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import useRefetch from '@/hooks/useRefetch';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import Link from 'next/link';

const Users = () => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/users/All Users' });
  const {
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
            <PageTitle>Users ({data?.data.totlaCount || 0})</PageTitle>
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
      <Search className="focus:border-primary focus-visible:ring-0 focus-visible:ring-transparent" />
      <UsersTable />
      <PaginationControl />
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
