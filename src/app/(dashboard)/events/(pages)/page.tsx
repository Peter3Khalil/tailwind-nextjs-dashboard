'use client';
import EventsTable from '@/app/(dashboard)/events/components/EventsTable';
import PaginationControl from '@/app/(dashboard)/events/components/PaginationControl';
import Search from '@/app/(dashboard)/events/components/Search';
import { useEvents } from '@/app/(dashboard)/events/providers/events-provider';
import { EventsTableProvider } from '@/app/(dashboard)/events/providers/events-table-provider';
import {
  PageContent,
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/layouts/PageLayout';
import { RefreshIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import Link from 'next/link';

const Events = () => {
  const {
    queryResult: { data, refetch: refresh, isLoading, isFetching },
  } = useEvents();
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/events/All Events' });
  return (
    <PageContent>
      <PageHeader>
        <div>
          <div className="flex items-center gap-2">
            <PageTitle>Events ({data?.data.totlaCount || 0})</PageTitle>
            <Button
              variant={'secondary'}
              size={'icon'}
              className="aspect-square size-auto rounded-full p-1"
              onClick={() => refresh()}
              disabled={isLoading || isFetching}
            >
              <RefreshIcon size={16} />
            </Button>
          </div>
          <PageDescription>Manage all events in one place</PageDescription>
        </div>
        <Button asChild>
          <Link href="/events/create">Create Event</Link>
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
