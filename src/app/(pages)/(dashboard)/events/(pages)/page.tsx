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
import {
  CalendarPlusIcon,
  CancelIcon,
  RefreshIcon,
} from '@/components/shared/Icons';
import MyTooltip from '@/components/shared/MyTooltip';
import { Button } from '@/components/ui/button';
import useSetBreadcrumb from '@/hooks/useSetBreadcrumb';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const Events = () => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [requestState, setRequestState] = useState<'requesting' | 'idle'>(
    'idle',
  );
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
  useSetBreadcrumb({ breadcrumbPath: '/dashboard/events/All Events' });
  const isRefetchingDone = useMemo(
    () => isFetched && !isFetching,
    [isFetched, isFetching],
  );

  const isRequesting = useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading],
  );

  const RequestActionsButtons = useMemo(() => {
    return {
      idle: (
        <>
          <MyTooltip content="Refresh" asChild>
            <Button
              variant={'secondary'}
              size={'icon'}
              className="aspect-square size-auto rounded-full p-1"
              onClick={() => refresh()}
            >
              <RefreshIcon size={16} />
            </Button>
          </MyTooltip>
          <p
            className={cn('text-xs text-muted-foreground', {
              hidden: !isRefetchingDone,
            })}
          >
            <strong className="mr-[1px] font-medium">Last updated:</strong>
            <span className="mx-1">{lastUpdated?.toLocaleTimeString()}</span>
          </p>
        </>
      ),
      requesting: (
        <MyTooltip content="Cancel" asChild>
          <Button
            variant={'secondary'}
            size={'icon'}
            className="aspect-square size-auto rounded-full p-1"
            onClick={cancelQuery}
          >
            <CancelIcon size={16} />
          </Button>
        </MyTooltip>
      ),
    };
  }, [cancelQuery, isRefetchingDone, lastUpdated, refresh]);

  useEffect(() => {
    if (isRequesting) {
      setRequestState('requesting');
    } else {
      setRequestState('idle');
    }
  }, [isRequesting]);

  useEffect(() => {
    if (isRefetchingDone && !isCancelled) {
      setLastUpdated(new Date());
    }
  }, [isCancelled, isRefetchingDone]);
  return (
    <PageContent>
      <PageHeader className="sm:items-center">
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
