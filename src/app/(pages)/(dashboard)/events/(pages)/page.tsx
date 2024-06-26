'use client';
import EventsTable from '@/app/(pages)/(dashboard)/events/components/EventsTable';
import PaginationControl from '@/app/(pages)/(dashboard)/events/components/PaginationControl';
import Search from '@/app/(pages)/(dashboard)/events/components/Search';
import { useEvents } from '@/app/(pages)/(dashboard)/events/providers/events-provider';
import { EventsTableProvider } from '@/app/(pages)/(dashboard)/events/providers/events-table-provider';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import { CalendarPlusIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import useRefetch from '@/hooks/useRefetch';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import Link from 'next/link';

const Events = () => {
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/events/All Events' });
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
  } = useEvents();

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
            <PageTitle>Events ({data?.data.totlaCount || 0})</PageTitle>
            <div className="flex items-center gap-1">
              {RequestActionsButtons[requestState]}
            </div>
          </div>
          <PageDescription>Manage all events in one place</PageDescription>
        </div>
        <Button asChild>
          <Link href="/events/create" className="flex items-center gap-2">
            <CalendarPlusIcon />
            <span className="hidden sm:block"> Create Event</span>
          </Link>
        </Button>
      </PageHeader>
      <Search className="focus:border-primary focus-visible:ring-0 focus-visible:ring-transparent" />
      <EventsTable />
      <PaginationControl />
    </PageContent>
  );
};

const Wrapper = () => {
  const {
    queryResult: { data },
  } = useEvents();
  return (
    <EventsTableProvider events={data?.data.data || []}>
      <Events />
    </EventsTableProvider>
  );
};

export default Wrapper;
