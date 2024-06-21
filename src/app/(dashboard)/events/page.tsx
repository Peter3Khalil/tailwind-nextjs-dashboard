'use client';
import { EventsTableProvider } from '@/app/(dashboard)/events/providers/events-table-provider';
import {
  Page,
  PageContent,
  PageDescription,
  PageHeader,
  PageSection,
  PageTitle,
} from '@/components/layouts/PageLayout';
import CustomBreadcrumb, {
  BreadcrumbItemType,
} from '@/components/shared/CustomBreadcrumb';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import EventsTable from './components/EventsTable';
import PaginationControl from './components/PaginationControl';
import Search from './components/Search';
import { useEvents } from './providers/events-provider';
import { RefreshIcon } from '@/components/shared/Icons';

const breadcrumbItems: BreadcrumbItemType[] = [
  {
    name: 'Dashboard',
    link: '/dashboard',
  },
  { name: 'Events', link: '/events' },
];

const Events = () => {
  const {
    queryResult: { data, refetch: refresh, isLoading, isFetching },
  } = useEvents();

  return (
    <Page>
      <PageSection>
        <CustomBreadcrumb
          breadcrumbPage={'All Events'}
          breadcrumbItems={breadcrumbItems}
        />
      </PageSection>
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
    </Page>
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
