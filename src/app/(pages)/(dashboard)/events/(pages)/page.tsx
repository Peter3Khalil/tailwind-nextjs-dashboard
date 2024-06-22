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
import { RefreshIcon } from '@/components/shared/Icons';
import { Button } from '@/components/ui/button';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useMemo } from 'react';

const Events = () => {
  const {
    queryResult: { data, refetch: refresh, isLoading, isFetching, isFetched },
  } = useEvents();
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/events/All Events' });
  const isFetchingDone = useMemo(
    () => isFetched && !isFetching,
    [isFetched, isFetching],
  );
  return (
    <PageContent>
      <PageHeader>
        <div>
          <div className="flex w-fit items-center gap-2">
            <PageTitle>Events ({data?.data.totlaCount || 0})</PageTitle>
            <Button
              variant={'secondary'}
              size={'icon'}
              className="aspect-square size-auto rounded-full p-1"
              onClick={() => refresh()}
              disabled={isLoading || isFetching}
            >
              <RefreshIcon
                className={cn({
                  'animate-spin': isFetching || isLoading,
                })}
                size={16}
              />
            </Button>
            {isFetchingDone && (
              <p className="text-xs text-muted-foreground">
                <strong className="mr-[1px] font-medium">Last updated:</strong>
                <span className="mx-1">{new Date().toLocaleTimeString()}</span>
              </p>
            )}
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
